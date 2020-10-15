import { Injectable } from '@angular/core';
import { IAppUser } from '../user.model';
import { FirestoreAbstractRepositoryService } from './firestore-abstract-repository.service';
import { FirestoreService } from '../../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends FirestoreAbstractRepositoryService<IAppUser> {

  readonly path = 'users';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
