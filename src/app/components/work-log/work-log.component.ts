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

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss'],
})
export class WorkLogComponent implements OnInit {
  workLogForm: FormGroup;

  docId: string;

  entries = [
    {
      id: 0,
      code: 'ordinary',
      name: 'Lavoro su Commessa',
      enableOrder: true,
    },
    {
      id: 1,
      code: 'medic',
      name: 'Malattia',
      enableOrder: false,
    },
    {
      id: 2,
      code: 'permssion',
      name: 'Ferie / Permessi / Assenze',
      enableOrder: false,
    },
  ];

  events = [
    {
      id: 0,
      eventCode: 'ordinary-covid',
      eventName: 'Lav. Ord. SW EmergCovid',
    },
    {
      id: 1,
      eventCode: 'ordinary',
      eventName: 'Lavoro Ordinario',
    },
    {
      id: 2,
      eventCode: 'extra-ordinary',
      eventName: 'Lavoro Staordinario',
    },
    {
      id: 3,
      eventCode: 'travel-hours',
      eventName: 'Ore viaggio',
    },
  ];

  orders = [
    {
      id: 0,
      orderCode: '15FBVIME',
      orderName: 'Visita Medica Aziendale',
    },
    {
      id: 1,
      orderCode: '16RPFORM',
      orderName: 'Formazione',
    },
    {
      id: 2,
      orderCode: '16SAFORM',
      orderName: 'Formazione Sicurezza aziendale',
    },
    {
      id: 3,
      orderCode: '18FBTRAS',
      orderName: 'Trasporto Pubblico',
    },
    {
      id: 4,
      orderCode: '19F25917',
      orderName: 'UBISS - Omnichannel Mobile',
    },
    {
      id: 5,
      orderCode: '19F26317',
      orderName: 'UBI - Sviluppo nuovo sito pubblico',
    },
    {
      id: 6,
      orderCode: '20H27262',
      orderName: 'VF-LAVAZZA FOL Demand 1883-Modifica sezioni locali',
    },
    {
      id: 7,
      orderCode: '20F27405',
      orderName: 'ISP - Dashboard forensi',
    },
    {
      id: 8,
      orderCode: '20W27488',
      orderName: 'CNH - App Mobile Competence Center',
    },
  ];

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private workLogRepository: WorkLogRepository,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
