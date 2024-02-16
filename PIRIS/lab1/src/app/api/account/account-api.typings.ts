import {
  MainAccount,
  PercentageAccount,
} from '../../components/bank-account/bank-account.typings';

export interface AccountSearchParms {
  userId: string;
  depositId: string;
}

export interface DepositAccounts {
  main: MainAccount;
  percents: PercentageAccount;
}
