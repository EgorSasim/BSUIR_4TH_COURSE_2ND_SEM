import { DepositAccounts } from '../../../../api/account/account-api.typings';
import { DepositContract } from '../deposit.typings';

export interface DepositWithAccounts {
  depositContract: DepositContract;
  accounts: DepositAccounts;
}