import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DepositPageService } from './deposit-page.service';
import { DepositWithAccounts } from './deposit-page.typings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrl: './deposit-page.component.scss',
  providers: [DepositPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent {
  public depositData$: Observable<DepositWithAccounts> =
    this.depositPageService.handleDepositIdChange();

  constructor(private depositPageService: DepositPageService) {}
}
