import * as utils from './core/utils';


export function eventDate(time: string, date?: Date): Date {
  const d = !!date ? new Date(date) : new Date();
  const parts = time.split(':').map(s => parseInt(s, 10));
  d.setHours(parts[0]);
  d.setMinutes(parts[1]);
  return d;
}


export function workLogsHours(workLog: any): number {
  const start = eventDate(workLog.startTime);
  const end = eventDate(workLog.endTime);
  return Math.abs(end.getTime() - start.getTime()) / 36e5;
}


export const updateWorkHours = utils.cloudFn().firestore
  .document('work-logs/{uid}')
  // trigger on create, update, delete
  .onWrite(async (change, context) => {

    // not triggering on delete
    if (!change.after.exists) {
      return null;
    }

    const newValue = change.after.exists ? change.after.data() : null;
    // const previousValue = change.before.exists ? change.before.data() : null;
    const id = context.params.uid;
    if (!newValue) {
      return Promise.reject('Error getting data');
    }

    const hours = workLogsHours(newValue);

    // change.after.ref.set()
    return utils.db_ref('work-logs', id).update({
      workedHours: hours
    });
  })
