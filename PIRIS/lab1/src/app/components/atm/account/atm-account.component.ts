import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AtmAccountService } from './atm-account.service';
import { UserApiService } from '../../../api/user/user-api.service';

@Component({
  selector: 'app-atm-account',
  templateUrl: './atm-account.component.html',
  styleUrl: './atm-account.component.scss',
  providers: [AtmAccountService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmAccountComponent {
  public userId: string;
  public cardId: string;
  public userName: string;
  public balance: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private atmAccountService: AtmAccountService,
    private userApiService: UserApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.handleRouteParms();
  }

  public getCurrentBalance(): void {
    this.atmAccountService
      .getCurrentBalance(this.userId)
      .subscribe((balance) => {
        this.balance = balance;
        this.changeDetectorRef.detectChanges();
      });
  }

  public getMoney(amount: Number): void {
    this.atmAccountService
      .getMoney(this.userId, amount)
      .subscribe(() => console.log('get money'));
  }

  public putMoney(amount: Number): void {
    this.atmAccountService
      .putMoney(this.userId, amount)
      .subscribe(() => console.log('put money'));
  }

  private handleRouteParms(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        tap((params) => {
          (this.userId = params.get('userId')),
            (this.cardId = params.get('bankCardId'));
        }),
        switchMap((params) =>
          this.userApiService.getUser(params.get('userId'))
        ),
        tap((user) => (this.userName = user.firstName + ' ' + user.lastName))
      )
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
  }
}
