import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import { UserEditPageService } from './user-edit-page.service';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ConvertToForm } from '../../../common/typings/form.typings';
import {
  User,
  UserCitizenship,
  UserCity,
  UserDisability,
  UserMartialStatus,
} from '../user.typings';
import { getControlErorMessage } from '../../../common/helpers/control-errors';
import { BackNavigationService } from '../../../common/services/back-navigation.service';
import { CreateUserModalBuilder } from '../create-user-modal/create-user-modal.component.builder';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.scss',
  providers: [UserEditPageService, CreateUserModalBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditPageComponent implements OnInit {
  public formGroup: FormGroup<ConvertToForm<Required<User>>> =
    this.createUserModalBuilder.createForm();
  public readonly residenceCities = Object.values(UserCity);
  public readonly citizenShips = Object.values(UserCitizenship);
  public readonly martialStatuses = Object.values(UserMartialStatus);
  public readonly disabilities = Object.values(UserDisability);

  constructor(
    private activatedRoute: ActivatedRoute,
    private userEditPageService: UserEditPageService,
    private backNavigationService: BackNavigationService,
    private router: Router,
    private createUserModalBuilder: CreateUserModalBuilder
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['idn']),
        filter((identificationNumber) => !!identificationNumber),
        switchMap((identificationNumber) =>
          this.userEditPageService.getUser(identificationNumber)
        )
      )
      .subscribe((user: Required<User>) => {
        this.formGroup.setValue(user);
      });
  }

  public getErrorMessage(errors: ValidationErrors): string {
    return getControlErorMessage(errors);
  }

  public onClose(): void {
    this.router.navigate([
      this.backNavigationService.areCurrAndPrevUrlSame
        ? 'home'
        : this.backNavigationService.getPreviousUrl(),
    ]);
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      alert('Сообщение об ошике!!!)');
      return;
    }
    this.userEditPageService
      .updateUser(this.formGroup.value as User)
      .subscribe(() => {
        console.log('update user');
        this.router.navigate([
          this.backNavigationService.areCurrAndPrevUrlSame
            ? 'home'
            : this.backNavigationService.getPreviousUrl(),
        ]);
      });
  }
}
