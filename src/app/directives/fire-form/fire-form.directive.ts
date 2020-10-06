import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, map, take, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFireForm]'
})
export class FireFormDirective implements OnInit, OnDestroy {

  @Input() appFireFormPath: string;
  @Input() formGroup: FormGroup;

  // tslint:disable-next-line:variable-name
  private _state: 'loading' | 'synced' | 'modified' | 'error';

  @Output() stateChange = new EventEmitter<string>();
  @Output() docCreated = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  // Firestore Document
  private docRef: AngularFirestoreDocument;

  // Subscriptions
  private formSub: Subscription;

  constructor(private afs: AngularFirestore) { }


  ngOnInit(): void {
    this.preloadData();
    this.autoSave();
  }

  // Loads initial form data from Firestore
  preloadData(): void {
    this.state = 'loading';
    this.docRef = this.getDocRef(this.appFireFormPath);
    this.docRef
      .valueChanges()
      .pipe(
        tap(doc => {
          if (doc) {
            this.formGroup.patchValue(doc);
            this.formGroup.markAsPristine();
            this.state = 'synced';
          }
        }),
        take(1)
      )
      .subscribe();
  }


  // Autosaves form changes
  autoSave(): void {
    this.formSub = this.formGroup.valueChanges
    .pipe(
      tap(change => {
        this.state = 'modified';
      }),
      debounceTime(2000),
      tap(change => {
        if (this.formGroup.valid && this._state === 'modified') {
          this.setDoc();
        }
      })
    )
    .subscribe();
  }



  @HostListener('ngSubmit', ['$event'])
  onSubmit(e): void {
    this.setDoc();
  }


  // Determines if path is a collection or document
  getDocRef(path: string): any {
    if (path.split('/').length % 2) {
      const ref = this.afs.doc(`${path}/${this.afs.createId()}`);
      this.docCreated.emit(ref.ref.id);
      return ref;
    } else {
      return this.afs.doc(path);
    }
  }

  // Writes changes to Firestore
  async setDoc(): Promise<void> {
    try {
      await this.docRef.set(this.formGroup.value, { merge: true });
      this.state = 'synced';
    } catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  // Setter for state changes
  set state(val) {
    this._state = val;
    this.stateChange.emit(val);
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }



}
