import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  SignInResponseType,
  SignInArgsType,
  CreateUserArgsType,
  CreateUserResponeType,
  UpdateUserArgsInterface,
  UserOptions
} from '../../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
import { UserService } from 'src/app/admin/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser$: BehaviorSubject<firebase.User>;
  public readonly userOptions$: Observable<UserOptions>;

  constructor(
    private readonly _afAuth: AngularFireAuth,
    private readonly _afs: AngularFirestore,
    private readonly _toastrService: ToastrService,
    private readonly _userService: UserService
  ) {
    this.currentUser$ = new BehaviorSubject(null);
    this.userOptions$ = this.currentUser$.pipe(
      filter(user => !!user?.uid),
      switchMap(user =>
        this._afs
          .collection('users')
          .doc<UserOptions>(user.uid)
          .valueChanges()
      )
    );
  }

  public get user(): firebase.User {
    return this.currentUser$.getValue();
  }

  async signIn(args: SignInArgsType): SignInResponseType {
    try {
      const { email, password } = args;
      const credential = await this._afAuth.signInWithEmailAndPassword(email, password);

      this.currentUser$.next(credential.user);
      return credential.user;
    } catch (err) {
      return null;
    }
  }

  async createUser(args: CreateUserArgsType): CreateUserResponeType {
    try {
      const { email, password } = args;
      const user = await this._afAuth.createUserWithEmailAndPassword(email, password);

      this._toastrService.success('User Created');

      return user;
    } catch (err) {}
  }

  async updateUsersData(args: UpdateUserArgsInterface): Promise<void> {
    try {
      const { data, options } = args;
      const user = await this._afs
        .collection('users')
        .doc(data.user.uid)
        .set(options);

      this._toastrService.success('User Updated');
    } catch (err) {}
  }
}
