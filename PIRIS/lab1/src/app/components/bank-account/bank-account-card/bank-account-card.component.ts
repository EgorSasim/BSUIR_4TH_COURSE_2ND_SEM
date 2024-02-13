import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BankAccountInfo } from '../bank-account-list/bank-account-list.typings';

@Component({
  selector: 'app-bank-account-card',
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountCardComponent {
  @Input() public accountInfo: BankAccountInfo;
}
