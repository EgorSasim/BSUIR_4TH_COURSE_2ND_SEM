import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertToForm } from '../../../common/typings/form.typings';
import { BankEmuDeposit } from '../bank-emu.typings';

@Injectable()
export class BankEmuCreateDepositModalBuilder {
  public createForm(): FormGroup<ConvertToForm<BankEmuDeposit>> {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      percent: new FormControl(null, [Validators.required]),
    });
  }
}
