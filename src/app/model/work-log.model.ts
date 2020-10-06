
import * as firebase from 'firebase';

export interface IWorkLog {
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
