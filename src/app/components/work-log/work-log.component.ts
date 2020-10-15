import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserRepository } from 'src/app/model/model-repository/user-repository.service';
import { WorkLogRepository } from '../../model/model-repository/work-log-repository.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {IWorkLog} from '../../model/work-log.model';
import {IAppUser} from '../../model/user.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {DateAdapter} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ILogEvent} from '../../model/event.model';
import {ILogEntry} from '../../model/entry.model';
import {ILogOrder} from '../../model/order.model';
import {EntryRepositoryService} from '../../model/model-repository/entry-repository.service';
import {EventRepositoryService} from '../../model/model-repository/event-repository.service';
import {OrderRepositoryService} from '../../model/model-repository/order-repository.service';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss'],
})
export class WorkLogComponent implements OnInit {
  workLogForm: FormGroup;

  docId: string;

  entries$: Observable<ILogEntry[]>;
  events$: Observable<ILogEvent[]>;
  orders$: Observable<ILogOrder[]>;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private entriesRepository: EntryRepositoryService,
    private eventsRepository: EventRepositoryService,
    private orderRepository: OrderRepositoryService,
    private workLogRepository: WorkLogRepository,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.events$ = this.eventsRepository.query$();
    this.entries$ = this.entriesRepository.query$();
    this.orders$ = this.orderRepository.query$();

    this.workLogForm = this.fb.group({
      type:        ['', Validators.required],
      event:       ['', Validators.required],
      order:       ['', Validators.required],
      description: ['', Validators.required],
      workDate:  [new Date(), Validators.required],
      startTime: ['9:00', Validators.required],
      endTime:   ['18:00', Validators.required],
    });

    this.workLogForm.controls.type.valueChanges.subscribe((v) => {
      if (!v.enabledOrder) {
        this.workLogForm.controls.order.setValue(null);
      }
    });

    this.route.params.pipe(
      map((params: Params) => params.id),
      filter(id => !!id),
      mergeMap(id => this.workLogRepository.one$(id))
    ).subscribe((log: IWorkLog) => {
      this.docId = log.id;
      this.workLogForm.patchValue(log);
    });

  }

  onFormSubmit(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    if (this.docId) {
      this.updateLog(this.docId, form.value).subscribe(log => {
        console.log('updated', log);
      });
    } else {
      this.createLog(form.value).subscribe((log: IWorkLog) => {
        this.router.navigate(['work-log', log.id]);
      });
    }
  }

  idCompareFn(e1: {id: string}, e2: {id: string}): boolean  {
    return e1.id === e2.id;
  }

  addDate(ev: MatDatepickerInputEvent<Date>): void{
    const workDate = firebase.firestore.Timestamp.fromDate(ev.value);
    this.workLogForm.patchValue({
      workDate
    });
  }

  private createLog(data: Partial<IWorkLog>): Observable<IWorkLog> {
    return this.auth.user$.pipe(
      map((user: IAppUser) => ({...data, logger: user.id})),
      mergeMap((log: Partial<IWorkLog>) => this.workLogRepository.create$(log))
    );
  }

  private updateLog(logId: string, data: IWorkLog): Observable<IWorkLog> {
    return this.auth.user$.pipe(
      map((user: IAppUser) => ({...data, logger: user.id})),
      mergeMap((log: Partial<IWorkLog>) => this.workLogRepository.update$(logId, log))
    );
  }

}
