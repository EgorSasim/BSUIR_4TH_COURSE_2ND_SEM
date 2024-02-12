import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BankAccountInfo } from './bank-account-list.typings';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrl: './bank-account-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountListComponent implements OnInit, OnChanges {
  @Input() public accountsInfo: BankAccountInfo[] = [];

  ngOnInit(): void {
    console.log('accountsInfo: ', this.accountsInfo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('accountsInfo :', this.accountsInfo);
  }
}
