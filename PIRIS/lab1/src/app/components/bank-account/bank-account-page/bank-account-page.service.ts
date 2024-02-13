import { Injectable } from '@angular/core';
import { DepositApiService } from '../../../api/deposit/deposit-api.service';
import { Observable, filter, forkJoin, map, of, switchMap } from 'rxjs';
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
              depositContracts: this.depositApiService.getAllUsersDeposits(
                user.id
              ),
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
      map((data) =>
        data.filter((dataItem) => dataItem.depositContracts.length)
      ),
      map((data) =>
        data.map((dataItem) => ({
          user: {
            firstName: dataItem.userData.firstName,
            lastName: dataItem.userData.lastName,
            identificationNumber: dataItem.userData.identificationNumber,
            id: dataItem.userData.id,
          },
          depositContracts: dataItem.depositContracts.map((contract) => ({
            serialNumber: contract.serialNumber,
            name: contract.deposit.name,
            id: contract.id,
          })),
        }))
      )
    );
  }
}
