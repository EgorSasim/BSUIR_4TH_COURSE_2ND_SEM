import { Injectable } from '@angular/core';
import { AccountSearchParms, DepositAccounts } from './account-api.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { USERS_COLLECTION_NAME } from '../user/user-api.constants';
import { ACCOUNT_COLLECTION_NAME } from './account-api.constants';
import { DEPOSIT_CONTRACTS_COLLECTION_NAME } from '../deposit/deposit-api.constants';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  constructor(private angularFireStore: AngularFirestore) {}

  public getAccounts(params: AccountSearchParms): Observable<DepositAccounts> {
    return this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(params.userId)
      .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
      .doc(params.depositId)
      .collection(ACCOUNT_COLLECTION_NAME)
      .get()
      .pipe(
        map((docsRef) => {
          const data = docsRef.docs[0]?.data();
          const id = docsRef.docs[0]?.id;
          return {
            ...(data as DepositAccounts),
            id,
          };
        })
      );
  }

  public updateDepositContractAccountsData({
    userId,
    depositId,
    depositAccounts,
  }: {
    userId: string;
    depositId: string;
    depositAccounts: DepositAccounts;
  }): Observable<void> {
    const accountsId$ = from(
      this.angularFireStore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
        .doc(depositId)
        .collection(ACCOUNT_COLLECTION_NAME)
        .ref.get()
        .then((data) => data.docs[0].id)
    );

    return accountsId$.pipe(
      switchMap((id) =>
        this.angularFireStore
          .collection(USERS_COLLECTION_NAME)
          .doc(userId)
          .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
          .doc(depositId)
          .collection(ACCOUNT_COLLECTION_NAME)
          .doc(id)
          .update(depositAccounts)
      )
    );
  }
}
