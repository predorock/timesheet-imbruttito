import { Injectable } from '@angular/core';
import { IWorkLog } from '../model/work-log.model';
import { AbstractFireService } from './abstract-fire.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class WorkLogService extends AbstractFireService<IWorkLog> {

  protected readonly path = 'work-logs';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
