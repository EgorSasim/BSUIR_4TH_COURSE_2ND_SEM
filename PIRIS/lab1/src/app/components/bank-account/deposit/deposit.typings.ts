import { CurrencyType } from '../../../common/typings/currency.typings';
import { User } from '../../user/user.typings';

export interface DepositContract {
  serialNumber: number;
  deposit: Deposit;
  startDate: Date;
  endDate: Date;
  duration: Date;
  amount: number;
  userIdentificationNumber: User['identificationNumber'];
  id?: string;
}

export interface Deposit {
  name: string;
  minDurationTime: Date;
  maxDurationTime: Date;
  minAmount: number;
  type: DepositType;
  percent: number;
  currencyType: CurrencyType;
}

export enum DepositType {
  Revocable = 'Revocable',
  Irrevocable = 'Irrevocable',
}
