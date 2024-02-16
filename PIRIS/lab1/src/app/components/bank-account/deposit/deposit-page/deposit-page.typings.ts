import { DepositAccounts } from '../../../../api/account/account-api.typings';
import { DepositContract } from '../deposit.typings';

export interface DepositContractWithAccounts {
  depositContract: DepositContract;
  accounts: DepositAccounts;
}
