import {Observable} from 'rxjs';
import { AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';

export interface IFirestoreRepository<T> {

  readonly path: Observable<string> | Promise<string> | string;

  colPath$: Observable<string>;

  docPath$(id: string): Observable<string>;

  ref$(id: string): Observable<AngularFirestoreDocument<T>>;

  query$(queryFn?: QueryFn): Observable<Array<T>>;

  one$(id: string): Observable<T>;

  create$(data: T | Partial<T>): Observable<T>;

  update$(id: string, data: T | Partial<T>): Observable<T>;

  delete$(id: string): Observable<void>;
}
