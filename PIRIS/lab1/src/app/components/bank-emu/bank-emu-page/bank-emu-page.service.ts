import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  BehaviorSubject,
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
  AVERAGE_DAY_PER_MONTH,
  HOUR_PER_DAY,
  MILLISECONDS_PER_SECOND,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../../../common/constants/time';

@Injectable()
export class BankEmuPageService {
  public isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  private readonly initialBankAccountVal: number = 10_000_000_000;
  public bankAccountVal$: BehaviorSubject<number> = new BehaviorSubject(
    this.initialBankAccountVal
  );

  public currentDate$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  public depositContractWithAccounts$: ReplaySubject<
    DepositContractWithAccounts[]
  > = new ReplaySubject(1);

  constructor(
    private userApiService: UserApiService,
    private depositApiService: DepositApiService,
    private accountApiService: AccountApiService
  ) {}

  public calculateInitialValues(): void {
    this.getDepositContractsWithAccounts()
      .pipe(
        tap(() => this.isLoading$.next(true)),
        switchMap((depositContractsWithAccounts) =>
          forkJoin([
            ...depositContractsWithAccounts.map((depositContractWithAccounts) =>
              this.updateDepositContractAccountsData({
                accounts: {
                  ...depositContractWithAccounts.accounts,
                  percents: {
                    ...depositContractWithAccounts.accounts.percents,
                    ...this.getPercentAccountInitialAmountAndDebit(
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
        ),
        switchMap(() => this.getDepositContractsWithAccounts())
      )
      .subscribe((deposits) => {
        this.depositContractWithAccounts$.next(deposits);
        this.calculateBankAccountValue(deposits);
        this.isLoading$.next(false);
      });
  }

  public recalculateDepositValues(): void {
    console.log('recalulate deposit value', this.currentDate$.value);
    this.increaseCurrentDate();
    this.getDepositContractsWithAccounts()
      .pipe(
        tap(() => this.isLoading$.next(true)),
        switchMap((depositContractsWithAccounts) =>
          forkJoin([
            ...depositContractsWithAccounts.map((depositContractWithAccounts) =>
              this.updateDepositContractAccountsData({
                accounts: {
                  ...depositContractWithAccounts.accounts,
                  percents: {
                    ...depositContractWithAccounts.accounts.percents,
                    ...this.getPercentAccountTickAmountAndDebit(
                      depositContractWithAccounts.accounts.main.debit,
                      depositContractWithAccounts.depositContract.deposit
                        .percent,
                      depositContractWithAccounts.depositContract.startDate,
                      depositContractWithAccounts.accounts.percents
                    ),
                  },
                },
                depositContract: depositContractWithAccounts.depositContract,
              })
            ),
          ])
        ),
        switchMap(() => this.getDepositContractsWithAccounts())
      )
      .subscribe((deposits) => {
        this.depositContractWithAccounts$.next(deposits);
        this.calculateBankAccountValue(deposits);
        this.isLoading$.next(false);
      });
  }

  private getPercentAccountTickAmountAndDebit(
    amount,
    percent,
    startDate,
    prevValue: PercentageAccount
  ) {
    if (this.currentDate$.value.getTime() < startDate.getTime()) {
      return { totalAmount: 0, debit: 0 };
    }

    const daysBeforeNow = Math.floor(
      (this.currentDate$.value.getTime() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );

    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;

    if (daysInMonthBeforeNow === 0) {
      return { totalAmount: prevValue.totalAmount + prevValue.debit, debit: 0 };
    }

    const daylyIncome = (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;

    return {
      totalAmount: prevValue.totalAmount,
      debit: prevValue.debit + daylyIncome,
    };
  }

  private getPercentAccountInitialAmountAndDebit(
    amount: number,
    percent: number,
    startDate: Date
  ): {
    totalAmount: PercentageAccount['totalAmount'];
    debit: PercentageAccount['debit'];
  } {
    if (Date.now() < startDate.getTime()) {
      return { totalAmount: 0, debit: 0 };
    }
    let debit = 0;
    const daysBeforeNow = Math.floor(
      (Date.now() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );
    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;
    const monthsBeforeNow = Math.floor(daysBeforeNow / AVERAGE_DAY_PER_MONTH);
    const totalAmount =
      monthsBeforeNow * AVERAGE_DAY_PER_MONTH * ((amount * percent) / 100);

    for (let i = 0; i < daysInMonthBeforeNow; ++i) {
      debit += (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;
    }

    return { debit, totalAmount };
  }

  private getDepositContractsWithAccounts(): Observable<
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
      switchMap((deposits) =>
        forkJoin(
          deposits.map((deposit) =>
            forkJoin({
              accounts: this.accountApiService.getAccounts({
                depositId: deposit.id,
                userId: deposit.userId,
              }),
              depositContract: of(deposit),
            })
          )
        )
      ),
      map((data) =>
        data.filter(
          (dataItem) =>
            dataItem.depositContract.endDate > this.currentDate$.value
        )
      )
    );
  }

  private updateDepositContractAccountsData(
    contract: DepositContractWithAccounts
  ): Observable<void> {
    return this.accountApiService.updateDepositContractAccountsData({
      userId: contract.depositContract.userId,
      depositId: contract.depositContract.id,
      depositAccounts: contract.accounts,
    });
  }

  private increaseCurrentDate(): void {
    const newDate = new Date(this.currentDate$.getValue());
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate$.next(newDate);
  }

  private calculateBankAccountValue(
    deposits: DepositContractWithAccounts[]
  ): void {
    this.bankAccountVal$.next(
      this.initialBankAccountVal +
        deposits.reduce(
          (acc, deposit) => (acc += deposit.accounts.percents.totalAmount),
          0
        )
    );
  }
}
