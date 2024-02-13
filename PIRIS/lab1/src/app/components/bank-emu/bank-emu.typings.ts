export interface BankEmuDeposit {
  name: string;
  duration: number;
  amount: number;
  percent: number;
}

export interface BankEmuChangesInfo {
  currMonth: number;
  expiredDeposits: BankEmuDeposit[];
  percentsIncome: number;
  workingDeposits: BankEmuDeposit[];
  capital: number;
}
