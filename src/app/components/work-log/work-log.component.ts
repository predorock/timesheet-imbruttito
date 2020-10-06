import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WorkLogService } from '../../services/work-log.service';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss'],
})
export class WorkLogComponent implements OnInit {
  workLogForm: FormGroup;

  state: string;

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
    private workLogService: WorkLogService
  ) {}

  ngOnInit(): void {
    this.workLogForm = this.fb.group({
      type: ['', Validators.required],
      event: ['', Validators.required],
      order: ['', Validators.required],
      description: ['', Validators.required],
      workDate: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      logger: ['', Validators.required],
    });

    this.workLogForm.controls.type.valueChanges.subscribe((v) => {
      if (!v.enabledOrder) {
        this.workLogForm.controls.order.setValue(null);
      }
    });

  }

  onChangeState(state: string): void {
    console.log(state);
    this.state = state;
  }

  onFormSubmit(form: FormGroup): void {
    console.log(form.value);
    if (form.status === 'INVALID') {
      return;
    }
    console.log(this.workLogForm.value);
    this.workLogService.create$(this.workLogForm.value);
  }

  onDocCreated(docId: string): void {
    this.docId = docId;
    this.workLogForm.controls.logger.setValue(docId);
  }

}
