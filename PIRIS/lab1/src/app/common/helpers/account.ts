import { DepositAccounts } from '../../api/account/account-api.typings';
import { ACCOUNT_SERIAL_NUMBER_LENGTH } from '../../components/bank-account/bank-account.constants';
import {
  Account,
  AccountActivity,
  AccountBalanceType,
} from '../../components/bank-account/bank-account.typings';
import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { getRandomString } from './random-values';

export function createDepositAccounts(
  depositContract: DepositContract
): DepositAccounts {
  return {
    main: {
      activity: AccountActivity.Active,
      balance: AccountBalanceType.Credit,
      code: 'random code',
      debit: depositContract.amount,
      credit: 0,
      name: 'main',
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
    },
    percents: {
      activity: AccountActivity.Active,
      balance: AccountBalanceType.Credit,
      code: 'random code',
      debit: depositContract.amount * (depositContract.deposit.percent / 100),
      credit: 0,
      name: 'percents',
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
    },
  };
}
