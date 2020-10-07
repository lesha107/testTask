import * as firebase from 'firebase';
import { SignIn, UserOptions, SignUp } from './user.interface';

export type SignInArgsType = SignIn;

export type SignInResponseType = Promise<Partial<firebase.User>>;

export type CreateUserArgsType = UserOptions;

export type CreateUserResponeType = Promise<Partial<firebase.auth.UserCredential>>;

export interface UpdateUserArgsInterface {
  data: Partial<firebase.auth.UserCredential>;
  options: SignUp;
}
