import { NgModule } from '@angular/core';
import { BankEmuPageComponent } from './bank-emu-page.component';
import { BankEmuCreateDepositModalModule } from '../bank-emu-create-deposit-modal/bank-emu-create-deposit-modal.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BankEmuPageComponent],
  imports: [
    BankEmuCreateDepositModalModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    CommonModule,
    MatIconModule,
  ],
})
export class BankEmuPageModule {}
