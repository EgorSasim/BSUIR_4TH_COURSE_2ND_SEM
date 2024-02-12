import { User } from '../../user/user.typings';
import { DepositContract } from '../deposit/deposit.typings';

export interface BankAccountInfo {
  userFirstName: User['firstName'];
  userLastName: User['lastName'];
  userIdentificationNumber: User['identificationNumber'];
  depositContractSerialNumber: DepositContract['serialNumber'];
  depositContractName: DepositContract['deposit']['name'];
  depositContractId: string;
}
