/**
 * - [ ] type of event
 - [ ] event
 - [ ] order id (optional depending from type of event or event)
 - [ ] date
 - [ ] start time
 - [ ] end time
 - [ ] (optional) show approver (approver is different from each type of event)
 *
 * */
import * as firebase from 'firebase';

export interface IWorkLog {
  type: string;
  event: string;
  oderId: string;
  date: firebase.firestore.Timestamp;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  title: string;
  description?: string;
  // user id of the log
  logger: string;
}
