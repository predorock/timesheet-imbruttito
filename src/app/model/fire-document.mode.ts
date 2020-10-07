import * as firebase from 'firebase';

export interface IFireDocument {
  id: string;
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
}
