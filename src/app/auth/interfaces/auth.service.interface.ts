import * as firebase from 'firebase';
import { SignIn, UserOptions } from './user.interface';

export type SignInArgsType = SignIn;

export type SignInResponseType = Promise<Partial<firebase.auth.UserCredential>>;

export type CreateUserArgsType = UserOptions;

export type CreateUserResponeType = Promise<Partial<firebase.auth.UserCredential>>;

export interface UpdateUserArgsInterface {
  data: Partial<firebase.auth.UserCredential>;
  options: UserOptions;
}
