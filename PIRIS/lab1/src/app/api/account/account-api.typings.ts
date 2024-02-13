import { Account } from '../../components/bank-account/bank-account.typings';

export interface AccountSearchParms {
  userId: string;
  depositId: string;
}

export interface DepositAccounts {
  main: Account;
  percents: Account;
}
