import { Injectable } from '@angular/core';
import { IWorkLog } from '../work-log.model';
import { FirestoreAbstractRepositoryService } from './firestore-abstract-repository.service';
import { FirestoreService } from '../../services/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class WorkLogRepository extends FirestoreAbstractRepositoryService<IWorkLog> {

  readonly path = 'work-logs';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
