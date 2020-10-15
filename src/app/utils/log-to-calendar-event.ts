import {IWorkLog} from '../model/work-log.model';
import {CalendarEvent} from 'angular-calendar';
import * as firebase from 'firebase';

export function logToCalendarEvent(log: IWorkLog): CalendarEvent {
  const {id, workDate, startTime, endTime} = log;
  const d = (workDate as unknown as firebase.firestore.Timestamp).toDate();
  return {
    id,
    title: eventName(log),
    start: eventDate(d, startTime),
    end: eventDate(d, endTime),
    meta: log
  };
}

export function eventName(log: IWorkLog): string {
  return `${log.order.orderName} - ${log.description}`;
}

export function eventDate(date: Date, time: string): Date {
  const d = new Date(date);
  const parts = time.split(':').map(s => parseInt(s, 10));
  d.setHours(parts[0]);
  d.setMinutes(parts[1]);
  return d;
}
