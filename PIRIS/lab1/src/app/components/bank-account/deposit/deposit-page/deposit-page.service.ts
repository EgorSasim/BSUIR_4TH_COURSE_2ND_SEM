import { Injectable } from '@angular/core';
import {
  Observable,
  combineLatest,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { DepositContract } from '../deposit.typings';
import { DepositSearchParams } from '../../../../api/deposit/deposit-api.typings';
import { DepositApiService } from '../../../../api/deposit/deposit-api.service';
import { ActivatedRoute } from '@angular/router';
import { AccountApiService } from '../../../../api/account/account-api.service';
import { DepositWithAccounts } from './deposit-page.typings';

@Injectable()
export class DepositPageService {
  constructor(
    private depositApiService: DepositApiService,
    private activatedRoute: ActivatedRoute,
    private accountApiService: AccountApiService
  ) {}

  private getDeposit(
    searchParams: DepositSearchParams
  ): Observable<DepositContract> {
    return this.depositApiService.getDeposit(searchParams);
  }

  public handleDepositIdChange(): Observable<DepositWithAccounts> {
    return combineLatest({
      depositId: this.activatedRoute.params.pipe(map((params) => params['id'])),
      userId: this.activatedRoute.queryParamMap.pipe(
        map((params) => params.get('userId'))
      ),
    }).pipe(
      switchMap(({ depositId, userId }) =>
        forkJoin({
          depositContract: this.getDeposit({ depositId, userId }),
          accounts: this.accountApiService.getAccounts({ depositId, userId }),
        })
      ),
      tap((data) => console.log(data))
    );
  }

  public removeDeposit(userId: string, id: string): Observable<void> {
    return this.depositApiService.removeDeposit(userId, id);
  }
}
