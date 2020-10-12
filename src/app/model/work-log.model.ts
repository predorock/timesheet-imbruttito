
import * as firebase from 'firebase';
import {IFireDocument} from './fire-document.mode';

export interface IWorkLog extends IFireDocument {
  type: any;
  event: any;
  order: any;
  workDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  // user id of the log
  logger: string;
}
