import { Injectable } from '@angular/core';
import { IWorkLog } from '../work-log.model';
import { FirestoreAbstractRepositoryService } from './firestore-abstract-repository.service';
import { FirestoreService } from '../../services/firestore.service';
import {Observable, of} from 'rxjs';
import {ILogEntry} from '../entry.model';
import {ILogEvent} from '../event.model';
import {ILogOrder} from '../order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderRepositoryService {

  query$(): Observable<ILogOrder[]> {
    return of([
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
    ]);
  }
}
