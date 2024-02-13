import { Injectable } from '@angular/core';
import { DepositApiService } from '../../../api/deposit/deposit-api.service';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { DepositContract } from '../deposit/deposit.typings';
import { UserApiService } from '../../../api/user/user-api.service';
import { BankAccountInfo } from '../bank-account-list/bank-account-list.typings';

@Injectable()
export class BankAccountPageService {
  constructor(
    private depositApiService: DepositApiService,
    private userApiService: UserApiService
  ) {}

  public createDepositContract(
    depositContract: DepositContract
  ): Observable<void> {
    return this.depositApiService.createDepositContract(depositContract);
  }

  public getAccountsInfo(): Observable<BankAccountInfo[]> {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) =>
            forkJoin({
              depositContract: this.depositApiService.getDeposit(user.id),
              userData: of({
                firstName: user.firstName,
                lastName: user.lastName,
                identificationNumber: user.identificationNumber,
                id: user.id,
              }),
            })
          )
        )
      ),
      map((userData) => userData.filter((data) => !!data.depositContract?.id)),
      map((data) => {
        return data.map((dataItem) => ({
          userFirstName: dataItem.userData.firstName,
          userLastName: dataItem.userData.lastName,
          userIdentificationNumber: dataItem.userData.identificationNumber,
          userId: dataItem.userData.id,
          depositContractSerialNumber: dataItem.depositContract.serialNumber,
          depositContractName: dataItem.depositContract.deposit.name,
          depositContractId: dataItem.depositContract.id,
        }));
      })
    );
  }
}
