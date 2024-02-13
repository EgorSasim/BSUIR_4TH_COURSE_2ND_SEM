import { NgModule } from '@angular/core';
import { BankEmuCreateDepositModalComponent } from './bank-emu-create-deposit-modal.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BankEmuCreateDepositModalComponent],
  imports: [MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  exports: [BankEmuCreateDepositModalComponent],
})
export class BankEmuCreateDepositModalModule {}
