import { NgModule } from '@angular/core';
import { DepositPageComponent } from './deposit-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DepositPageComponent],
  imports: [MatButtonModule, MatCardModule, CommonModule],
})
export class DepositPageModule {}
