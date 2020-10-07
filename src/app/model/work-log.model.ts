
import * as firebase from 'firebase';
import {IFireDocument} from './fire-document.mode';

export interface IWorkLog extends IFireDocument {
  type: any;
  event: any;
  order: any;
  workDate: firebase.firestore.Timestamp;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  description: string;
  // user id of the log
  logger: string;
}
