import { Injectable } from '@angular/core';
import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { Observable, filter, from, map, of, switchMap, tap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { USERS_COLLECTION_NAME } from '../user/user-api.constants';
import { User } from '../../components/user/user.typings';
import { DEPOSIT_CONTRACTS_COLLECTION_NAME } from './deposit-api.constants';
import { ACCOUNT_COLLECTION_NAME } from '../account/account-api.constants';
import { createDepositAccounts } from '../../common/helpers/account';

@Injectable({
  providedIn: 'root',
})
export class DepositApiService {
  constructor(private angularFireStore: AngularFirestore) {}

  public createDepositContract(
    depositContract: DepositContract
  ): Observable<void> {
    const userCollectionRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(depositContract.userId)
      .get();

    return userCollectionRef.pipe(
      switchMap((userRef) => {
        return userRef.ref
          .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
          .add(depositContract);
      }),
      switchMap((depositRef) => {
        return depositRef
          .collection(ACCOUNT_COLLECTION_NAME)
          .add(createDepositAccounts(depositContract));
      })
    ) as Observable<any>;
  }

  public getDeposit(userId: string): Observable<DepositContract> {
    const userRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(userId)
      .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
      .get()
      .pipe(
        map((docsRef) => {
          const data = docsRef.docs[0]?.data();
          const id = docsRef.docs[0]?.id;
          return { ...(data as DepositContract), id };
        })
      );

    return userRef;
  }
}
