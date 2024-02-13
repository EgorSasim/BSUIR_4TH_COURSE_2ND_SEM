import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDepositModalComponent } from '../deposit/create-deposit-modal/create-deposit-modal.component';
import { Router } from '@angular/router';
import { BankAccountPageService } from './bank-account-page.service';
import { DepositContract } from '../deposit/deposit.typings';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { BankAccountInfo } from '../bank-account-list/bank-account-list.typings';

@Component({
  selector: 'app-bank-account-page',
  templateUrl: './bank-account-page.component.html',
  styleUrl: './bank-account-page.component.scss',
  providers: [BankAccountPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountPageComponent {
  public accountsInfo$: Observable<BankAccountInfo[]> =
    this.bankAccountPageService.getAccountsInfo();

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private bankAccountPageService: BankAccountPageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public showCreateDepositModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };

    const dialogRef = this.matDialog.open(CreateDepositModalComponent, config);
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((contract: DepositContract) => {
          return this.bankAccountPageService.createDepositContract(contract);
        })
      )
      .subscribe(() => {
        this.accountsInfo$ = this.bankAccountPageService.getAccountsInfo();
        this.changeDetectorRef.detectChanges();
      });
  }

  public goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
