import { User } from '../../user/user.typings';
import { DepositContract } from '../deposit/deposit.typings';

export interface BankAccountInfo {
  user: {
    firstName: User['firstName'];
    lastName: User['lastName'];
    identificationNumber: User['identificationNumber'];
    id: User['id'];
  };
  depositContracts: BankAccountInfoDepositContract[];
}

export interface BankAccountInfoDepositContract {
  serialNumber: DepositContract['serialNumber'];
  name: DepositContract['deposit']['name'];
  id: string;
}
