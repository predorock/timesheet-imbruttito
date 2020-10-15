import { Pipe, PipeTransform } from '@angular/core';
import { IWorkLog } from '../model/work-log.model';
import { CalendarEvent } from 'angular-calendar';

@Pipe({
  name: 'workedHours'
})
export class WorkedHoursPipe implements PipeTransform {

  transform(value: CalendarEvent<IWorkLog>[]): number {
    return value.reduce((acc, log) => acc + (log.meta.workedHours || 0), 0);
  }

}
