import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BankEmuPageService } from './bank-emu-page.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BankEmuCreateDepositModalComponent } from '../bank-emu-create-deposit-modal/bank-emu-create-deposit-modal.component';
import { filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-emu-page',
  templateUrl: './bank-emu-page.component.html',
  styleUrl: './bank-emu-page.component.scss',
  providers: [BankEmuPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankEmuPageComponent {
  public bankChangesInfo$ = this.bankEmuPageService.bankChangesInfo$;

  constructor(
    private bankEmuPageService: BankEmuPageService,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  public showDepositAddModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      height: '28rem',
      width: '40rem',
    };

    const dialogRef = this.matDialog.open(
      BankEmuCreateDepositModalComponent,
      config
    );

    dialogRef
      .afterClosed()
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        this.bankEmuPageService.addDeposit(val);
        this.bankEmuPageService.updateBankEmuChangeInfo();
      });
  }

  public handleBankChangesInfo(): void {
    this.bankChangesInfo$.subscribe((val) => console.log('handled val: ', val));
  }

  public tick(): void {
    this.bankEmuPageService.tick();
  }

  public reset(): void {
    this.bankEmuPageService.reset();
  }

  public goToHomePage(): void {
    this.router.navigate(['home']);
  }
}
