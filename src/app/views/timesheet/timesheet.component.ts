import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { WorkLogRepository } from '../../model/model-repository/work-log-repository.service';
import { AuthService } from '../../services/auth.service';
import { map, mergeMap, take } from 'rxjs/operators';
import { logToCalendarEvent } from '../../utils/log-to-calendar-event';
import { IWorkLog } from 'src/app/model/work-log.model';
import { isSameDay, isSameMonth } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<void> = new Subject<void>();

  events$: Observable<CalendarEvent<IWorkLog>[]>;

  actions: CalendarEventAction[] = [
    {
      label: '<span class="event-action">Edit</span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        const { id } = event;
        this.router.navigate(['work-log', id]);
      },
    },
    {
      label: '<span class="event-action">Delete</span>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        const { id } = event;
        this.workLogRepo
          .delete$(`${id}`)
          .pipe(take(1))
          .subscribe((_) => this.refresh.next());
      },
    },
  ];

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

  activeDayIsOpen: boolean;

  constructor(
    private workLogRepo: WorkLogRepository,
    private auth: AuthService,
    private router: Router
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  ngOnInit(): void {
    this.events$ = this.auth.user$.pipe(
      map(({ id }) => id),
      mergeMap((userId) =>
        this.workLogRepo
          .query$((ref) => ref.where('logger', '==', userId))
          // .query$()
          .pipe(
            map((logs) => logs.map((l) => logToCalendarEvent(l))),
            map((logs) => logs.map((l) => ({ ...l, actions: this.actions })))
          )
      )
    );

    this.events$
      .pipe(
        map(
          (evs) =>
            evs.filter((e) => isSameDay(e.start, this.viewDate)).length > 0
        )
      )
      .subscribe((res) => {
        this.activeDayIsOpen = res;
      });
  }
}
