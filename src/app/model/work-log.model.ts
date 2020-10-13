
import * as firebase from 'firebase';
import {IFireDocument} from './fire-document.mode';
import {ILogEvent} from './event.model';
import {ILogOrder} from './order.model';
import {ILogEntry} from './entry.model';

export interface IWorkLog extends IFireDocument {
  type: ILogEntry;
  event: ILogEvent;
  order: ILogOrder;
  workDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  // user id of the log
  logger: string;
}
