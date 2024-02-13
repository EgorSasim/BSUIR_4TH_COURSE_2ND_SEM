import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { ConvertToForm } from '../typings/form.typings';

export function areContractFieldsAppropToChoosenDeposit(): ValidatorFn {
  return (
    form: FormGroup<ConvertToForm<Omit<DepositContract, 'id'>>>
  ): ValidationErrors | null => {
    const controls = form.controls;
    if (
      !controls['deposit'].value ||
      !controls['startDate'].value ||
      !controls['endDate'].value ||
      !controls['amount'].value
    ) {
      return null;
    }

    const choosenDuration =
      controls.endDate.value.getTime() - controls.startDate.value.getTime();

    if (
      choosenDuration <
        controls.deposit.value.minDurationTime.getTime() - Date.now() ||
      choosenDuration >
        controls.deposit.value.maxDurationTime.getTime() - Date.now()
    ) {
      return { invalidDepositDuration: true };
    }

    if (controls.amount.value < controls.deposit.value.minAmount) {
      return { invalidDepositAmount: true };
    }

    return null;
  };
}
