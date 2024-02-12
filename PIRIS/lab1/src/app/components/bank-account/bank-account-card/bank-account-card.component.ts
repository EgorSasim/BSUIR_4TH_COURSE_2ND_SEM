import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BankAccountInfo } from '../bank-account-list/bank-account-list.typings';

@Component({
  selector: 'app-bank-account-card',
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountCardComponent implements OnChanges {
  @Input() public accountInfo: BankAccountInfo;

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('accountInfo: ', this.accountInfo);
  }
}
