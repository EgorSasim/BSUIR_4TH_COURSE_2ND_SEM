import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BankEmuCreateDepositModalBuilder } from './bank-emu-create-deposit-modal.builder';

@Component({
  selector: 'app-bank-emu-create-deposit-modal',
  templateUrl: './bank-emu-create-deposit-modal.component.html',
  styleUrl: './bank-emu-create-deposit-modal.component.scss',
  providers: [BankEmuCreateDepositModalBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankEmuCreateDepositModalComponent {
  public formGroup = this.bankEmuCreateDepositModalBuilder.createForm();

  constructor(
    private matDialogRef: MatDialogRef<BankEmuCreateDepositModalComponent>,
    private bankEmuCreateDepositModalBuilder: BankEmuCreateDepositModalBuilder
  ) {}

  public onSave(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.matDialogRef.close(this.formGroup.value);
  }

  public onClose(): void {
    this.matDialogRef.close();
  }
}
