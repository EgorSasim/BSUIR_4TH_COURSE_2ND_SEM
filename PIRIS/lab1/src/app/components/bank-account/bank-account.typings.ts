import { User } from '../user/user.typings';

export interface MainAccount {
  serialNumber: string;
  debit: number;
  id?: string;
}

export interface PercentageAccount {
  serialNumber: string;
  debit: number;
  id?: string;
  totalAmount: number;
}

export type AccountName =
  | User['firstName']
  | User['lastName']
  | User['identificationNumber'];
