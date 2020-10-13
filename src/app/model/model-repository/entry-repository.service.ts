import { Injectable } from '@angular/core';
import { IWorkLog } from '../work-log.model';
import { FirestoreAbstractRepositoryService } from './firestore-abstract-repository.service';
import { FirestoreService } from '../../services/firestore.service';
import {Observable, of} from 'rxjs';
import {ILogEntry} from '../entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryRepositoryService {

  query$(): Observable<ILogEntry[]> {
    return of([
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
      }
    ]);
  }
}
