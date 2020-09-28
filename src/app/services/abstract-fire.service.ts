import { FirestoreService } from './firestore.service';
import { from, Observable } from 'rxjs';
import { mergeMap, map, first, switchMap, tap } from 'rxjs/operators';
import { wrapIntoObservable } from '../utils/wrapIntoObservable';
import { AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';

export abstract class AbstractFireService<T extends object> {


  protected readonly abstract path: Observable<string> | Promise<string> | string;

  constructor(
    private db: FirestoreService
  ) { }

  get colPath$(): Observable<string> {
    return wrapIntoObservable(this.path);
  }

  docPath$(id: string): Observable<string> {
    return this.colPath$.pipe(
      map(path => `${path}/${id}`)
    );
  }

  ref$(id: string): Observable<AngularFirestoreDocument<T>> {
    return this.docPath$(id).pipe(
      map(docPath => this.db.doc(docPath))
    );
  }

  query$(queryFn?: QueryFn): Observable<Array<T>> {
    return this.colPath$.pipe(
      switchMap(colPath => this.db.colWithIds$<T>(colPath, queryFn))
    );
  }

  one$(id: string): Observable<T> {
    return this.docPath$(id).pipe(
      switchMap(docPath => this.db.doc$<T>(docPath)),
      map(data => Object.assign(data, {id})),
      first()
    );
  }

  create$(data: T | Partial<T>): Observable<T> {
    const id = this.db.createId();
    return this.docPath$(id).pipe(
      switchMap(docPath => from(this.db.set<T>(docPath, Object.assign({id}, data))).pipe(
        mergeMap(_ => this.one$(id))
      ))
    );
  }

  update$(id: string, data: T | Partial<T>): Observable<T> {
    return this.docPath$(id).pipe(
      switchMap(docPath => from(this.db.update<T>(docPath, data)).pipe(
        mergeMap(_ => this.one$(id))
      ))
    );
  }

  delete$(id: string): Observable<void> {
    return this.docPath$(id).pipe(
      tap((doc) => console.log(doc)),
      switchMap(docPath => from(this.db.delete<T>(docPath)))
    );
  }
}