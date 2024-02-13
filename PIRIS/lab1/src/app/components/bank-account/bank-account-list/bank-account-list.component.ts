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
export class BankAccountListComponent {
  @Input() public accountsInfo: BankAccountInfo[] = [];
}
