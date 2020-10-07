import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { initFirestoreData } from 'src/app/utils/firebase/firestore';
import { FirebaseUserOptions } from 'src/app/auth/interfaces';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/auth/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public ordersCollection$: Observable<AngularFirestoreCollection>;
  public ordersCollectionBehaviourSubject: BehaviorSubject<AngularFirestoreCollection>;
  constructor(private readonly _afs: AngularFirestore, private readonly _authService: AuthService) {
    this.ordersCollectionBehaviourSubject = new BehaviorSubject(null);
    this.ordersCollection$ = this.ordersCollectionBehaviourSubject.asObservable();
    this._authService.currentUser$
      .pipe(
        untilDestroyed(this),
        filter(user => !!user?.uid)
      )
      .subscribe(({ uid }) => {
        console.log('uid', uid);
        const orders = this._afs
          .collection('users')
          .doc(uid)
          .collection('orders');
        this.ordersCollectionBehaviourSubject.next(orders);
      });
  }

  // getUsers(): Observable<FirebaseUserOptions[]> {
  //   return this._afs
  //     .collectionGroup('users')
  //     .snapshotChanges()
  //     .pipe(map(initFirestoreData));
  // }

  public get ordersCollection() {
    return this.ordersCollectionBehaviourSubject.getValue();
  }
  public createNewOrder(data) {
    console.log('data', this.ordersCollection);
    this.ordersCollection.doc(data.id.toString()).set({ order: data.order, status: data.status });
  }

  public getUserOrders() {
    return this._authService.currentUser$.pipe(
      filter(user => !!user?.uid),
      switchMap(user =>
        this._afs
          .collection('users')
          .doc(user.uid)
          .collection('orders')
          .snapshotChanges()
          .pipe(map(initFirestoreData))
      )
    );
  }

  public getAllOrders() {
    return this._authService.currentUser$.pipe(
      filter(user => !!user?.uid),
      switchMap(user =>
        this._afs
          .collectionGroup('orders')
          .snapshotChanges()
          .pipe(map(initFirestoreData))
      )
    );
  }
}
