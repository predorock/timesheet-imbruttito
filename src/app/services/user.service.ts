import { Injectable } from '@angular/core';
import { IAppUser } from '../model/user.model';
import { AbstractFireService } from './abstract-fire.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractFireService<IAppUser> {

  protected readonly path = 'users';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
