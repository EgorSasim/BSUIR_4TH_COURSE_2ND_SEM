import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { UserApiService } from '../../../api/user/user-api.service';
import { DepositApiService } from '../../../api/deposit/deposit-api.service';
import { AccountApiService } from '../../../api/account/account-api.service';
import { DepositContractWithAccounts } from '../../bank-account/deposit/deposit-page/deposit-page.typings';
import { PercentageAccount } from '../../bank-account/bank-account.typings';
import {
  AVAREAGE_DAY_PER_MONTH,
  HOUR_PER_DAY,
  MILLISECONDS_PER_SECOND,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../../../common/constants/time';
import { DepositContract } from '../../bank-account/deposit/deposit.typings';

@Injectable()
export class BankEmuPageService {
  public depositContractWithAccounts$: ReplaySubject<
    DepositContractWithAccounts[]
  > = new ReplaySubject(1);

  constructor(
    private userApiService: UserApiService,
    private depositApiService: DepositApiService,
    private accountApiService: AccountApiService
  ) {}

  public getDepositContractsWithAccounts(): Observable<
    DepositContractWithAccounts[]
  > {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) =>
            this.depositApiService.getAllUsersDeposits(user.id)
          )
        )
      ),
      map((deposits) => deposits.flat(1)),
      tap((deposits) => console.log('deposits: ', deposits)),
      switchMap((deposits) =>
        forkJoin(
          deposits.map((deposit) =>
            forkJoin({
              accounts: this.accountApiService.getAccounts({
                depositId: deposit.id,
                userId: deposit.userId,
              }),
              depositContract: of(
                this.getDepositContractWithNormalDateForma(deposit)
              ),
            })
          )
        )
      )
    );
  }

  public updateDepositContractAccountsData(
    contract: DepositContractWithAccounts
  ): any {
    return this.accountApiService.updateDepositContractAccountsData({
      userId: contract.depositContract.userId,
      depositId: contract.depositContract.id,
      depositAccounts: contract.accounts,
    });
  }

  public calculateInitialValues(): void {
    this.getDepositContractsWithAccounts()
      .pipe(
        switchMap((depositContractsWithAccounts) =>
          forkJoin([
            depositContractsWithAccounts.map((depositContractWithAccounts) =>
              this.updateDepositContractAccountsData({
                accounts: {
                  ...depositContractWithAccounts.accounts,
                  percents: {
                    ...depositContractWithAccounts.accounts.percents,
                    totalAmount: this.setPercentAccountInitialAmount(
                      depositContractWithAccounts.accounts.main.debit,
                      depositContractWithAccounts.depositContract.deposit
                        .percent,
                      depositContractWithAccounts.depositContract.startDate
                    ),
                  },
                },
                depositContract: depositContractWithAccounts.depositContract,
              })
            ),
          ])
        )
      )
      .subscribe(() => 'account recalculation completed calculation');
  }

  private setPercentAccountInitialAmount(
    amount: number,
    percent: number,
    startDate: Date
  ): PercentageAccount['totalAmount'] {
    if (Date.now() < startDate.getTime()) {
      return 0;
    }
    let res = 0;
    const daysBeforeNow =
      Math.round(
        (Date.now() - startDate.getTime()) /
          MILLISECONDS_PER_SECOND /
          SECONDS_PER_MINUTE /
          MINUTES_PER_HOUR /
          HOUR_PER_DAY
      ) % AVAREAGE_DAY_PER_MONTH;
    for (let i = 0; i < daysBeforeNow; ++i) {
      res += (amount * percent) / 100 / 12 / AVAREAGE_DAY_PER_MONTH;
    }

    return res;
  }

  private getDepositContractWithNormalDateForma(
    depositContract: DepositContract
  ): DepositContract {
    return {
      ...depositContract,
      startDate: new Date(depositContract.startDate['seconds'] * 1000),
      endDate: new Date(depositContract.endDate['seconds'] * 1000),
      duration: new Date(depositContract.duration['seconds'] * 1000),
    };
  }
}
