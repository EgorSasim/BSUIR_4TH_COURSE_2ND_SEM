import { User } from '../user/user.typings';

export interface Account {
  serialNumber: string;
  code: string;
  activity: AccountActivity;
  debit: number;
  credit: number;
  balance: AccountBalanceType;
  name: AccountName;
}

export enum AccountActivity {
  Active = 'Active',
  Passive = 'Passive',
  ActivePassive = 'Active-Passive',
}

export enum AccountBalanceType {
  Debit = 'Debit',
  Credit = 'Credit',
  Nullable = 'Nullable',
}

export type AccountName =
  | User['firstName']
  | User['lastName']
  | User['identificationNumber'];
