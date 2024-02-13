import { Injectable } from '@angular/core';
import { BankEmuChangesInfo, BankEmuDeposit } from '../bank-emu.typings';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class BankEmuPageService {
  public bankChangesInfo$: ReplaySubject<BankEmuChangesInfo> =
    new ReplaySubject(1);
  private startCapital: number = 100_000_000_000;
  private deposits: BankEmuDeposit[] = [];
  private currMonth: number = 0;

  constructor() {
    this.updateBankEmuChangeInfo();
  }

  public addDeposit(deposit: BankEmuDeposit) {
    this.deposits.push(deposit);
    this.startCapital += deposit.amount;
  }

  public tick(): void {
    this.currMonth += 1;
    this.startCapital -= this.getDepositsPercentsIncome(this.deposits);
    this.updateBankEmuChangeInfo();
  }

  public updateBankEmuChangeInfo() {
    this.bankChangesInfo$.next({
      currMonth: this.currMonth,
      capital: this.startCapital,
      percentsIncome: this.getDepositsPercentsIncome(this.deposits),
      expiredDeposits: this.deposits.filter(
        (deposit) => deposit.duration <= this.currMonth
      ),
      workingDeposits: this.deposits.filter(
        (deposit) => deposit.duration > this.currMonth
      ),
    });
  }

  public reset(): void {
    this.currMonth = 0;
    this.startCapital = 100_000_000_000;
    this.deposits = [];
    this.updateBankEmuChangeInfo();
  }

  private getDepositsPercentsIncome(deposits: BankEmuDeposit[]): number {
    return deposits.reduce(
      (acc, deposit) =>
        (acc +=
          deposit.duration <= this.currMonth
            ? 0
            : (deposit.amount * deposit.percent) / 12),
      0
    );
  }
}
