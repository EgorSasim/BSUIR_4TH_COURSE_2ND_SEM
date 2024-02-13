import {
  BankAccountInfo,
  BankAccountInfoDepositContract,
} from '../bank-account-list/bank-account-list.typings';

export interface BankAccountCard {
  user: BankAccountInfo['user'];
  contract: BankAccountInfoDepositContract;
}
