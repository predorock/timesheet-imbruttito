import { Injectable } from '@angular/core';
import { IWorkLog } from '../work-log.model';
import { FirestoreAbstractRepositoryService } from './firestore-abstract-repository.service';
import { FirestoreService } from '../../services/firestore.service';
import {Observable, of} from 'rxjs';
import {ILogEntry} from '../entry.model';
import {ILogEvent} from '../event.model';


@Injectable({
  providedIn: 'root'
})
export class EventRepositoryService {

  query$(): Observable<ILogEvent[]> {
    return of([
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
    ]);
  }
}
