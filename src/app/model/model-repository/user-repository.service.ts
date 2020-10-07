import { Injectable } from '@angular/core';
import { IAppUser } from '../user.model';
import { AbstractFireService } from '../../services/abstract-fire.service';
import { FirestoreService } from '../../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends AbstractFireService<IAppUser> {

  protected readonly path = 'users';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
