import {IWorkLog} from '../model/work-log.model';
import {CalendarEvent} from 'angular-calendar';
import * as firebase from 'firebase';

export function logToCalendarEvent(log: IWorkLog): CalendarEvent {
  const {id, workDate, startTime, endTime} = log;
  const d = (workDate as unknown as firebase.firestore.Timestamp).toDate();
  return {
    id,
    title: eventName(log),
    start: eventDate(startTime, d),
    end: eventDate(endTime, d),
    meta: log
  };
}

export function eventName(log: IWorkLog): string {
  return `${log.order.orderName} - ${log.description}`;
}

export function eventDate(time: string, date?: Date): Date {
  const d = !!date ? new Date(date) : new Date();
  const parts = time.split(':').map(s => parseInt(s, 10));
  d.setHours(parts[0]);
  d.setMinutes(parts[1]);
  return d;
}
