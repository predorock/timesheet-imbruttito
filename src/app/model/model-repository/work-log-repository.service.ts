import { Injectable } from '@angular/core';
import { IWorkLog } from '../work-log.model';
import { AbstractFireService } from '../../services/abstract-fire.service';
import { FirestoreService } from '../../services/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class WorkLogRepository extends AbstractFireService<IWorkLog> {

  protected readonly path = 'work-logs';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
