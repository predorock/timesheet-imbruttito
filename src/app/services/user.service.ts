import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAppUser } from '../model/user.model';
import { AuthService } from './auth.service';
import { AbstractFireService } from './abstract-fire.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractFireService<IAppUser> {

  protected readonly path = 'user';

  constructor(
    fss: FirestoreService
  ) {
    super(fss);
  }
}
