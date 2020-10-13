import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {Observable} from 'rxjs';
import {WorkLogRepository} from '../../model/model-repository/work-log-repository.service';
import {AuthService} from '../../services/auth.service';
import {map, mergeMap} from 'rxjs/operators';
import {logToCalendarEvent} from '../../utils/log-to-calendar-event';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent[]>;

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  constructor(
    private workLogRepo: WorkLogRepository,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.events$ = this.auth.user$.pipe(
      map(({id}) => (id)),
      mergeMap(userId => this.workLogRepo.query$(ref => ref.where('logger', '==', userId)).pipe(
        map((logs) => logs.map(l => logToCalendarEvent(l)))
      ))
    );
  }

}
