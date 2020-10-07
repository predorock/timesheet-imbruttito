import {IFireDocument} from './fire-document.mode';

export interface IAppUser extends IFireDocument{
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL: string;
}
