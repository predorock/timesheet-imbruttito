import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAppUser } from '../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import {switchMap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IAppUser>;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<IAppUser>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async googleSignIn(): Promise<Partial<User>> {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  async microsoftSignIn(): Promise<Partial<User>> {
    const provider = new auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      // Force re-consent.
      prompt: 'consent',

      // tenant: '6f9be7cc-7cff-4784-ae3e-f3f71ee8fd64'
    });
    const credentials = await this.fireAuth.signInWithRedirect(provider);
    console.log('credentials', credentials);
    return this.updateUserData(null);
  }

  async anonymousSignIn(): Promise<void> {
    const creds = await this.fireAuth.signInAnonymously();
    console.log(creds);
  }

  private async updateUserData({uid, email, displayName, photoURL }: User): Promise<Partial<User>>  {

    const userRef: AngularFirestoreDocument<IAppUser> = this.db.doc(`users/${uid}`);
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };
    await userRef.set(data, {merge: true});
    return data;
  }

  logout(): void {
    this.fireAuth.signOut();
  }
}
