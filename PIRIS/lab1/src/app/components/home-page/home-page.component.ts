import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UserCard } from '../user/user-card/user-card.typings';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../user/create-user-modal/create-user-modal.component';
import { User } from '../user/user.typings';
import { HomePageService } from './home-page.service';
import { Observable, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  providers: [HomePageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public userCardList$: Observable<UserCard[]> =
    this.homePageService.getUserCards();

  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private homePageService: HomePageService
  ) {}

  public showAddUserModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };

    const dialogRef = this.matDialog.open(CreateUserModalComponent, config);
    dialogRef
      .afterClosed()
      .pipe(
        filter((user) => !!user),
        switchMap((user) => this.homePageService.addUser(user))
      )
      .subscribe(() => {
        this.userCardList$ = this.homePageService.getUserCards();
        this.changeDetectorRef.detectChanges();
      });
  }
}
