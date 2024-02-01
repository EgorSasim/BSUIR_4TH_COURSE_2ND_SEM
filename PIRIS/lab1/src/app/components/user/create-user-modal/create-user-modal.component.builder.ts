import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  User,
  UserCitizenship,
  UserCity,
  UserDisability,
  UserMartialStatus,
} from '../user.typings';
import { ConvertToForm } from '../../../common/typings/form.typings';

@Injectable()
export class CreateUserModalBuilder {
  public createForm(): FormGroup<ConvertToForm<Required<User>>> {
    return new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      passportSeries: new FormControl('', [Validators.required]),
      passportNumber: new FormControl('', [Validators.required]),
      issuedBy: new FormControl('', [Validators.required]),
      dateOfIssue: new FormControl(null, [Validators.required]),
      identificationNumber: new FormControl('', [Validators.required]),
      placeOfBirth: new FormControl('', [Validators.required]),
      actualResidenceCity: new FormControl(UserCity.Baranovichi as UserCity, [
        Validators.required,
      ]),
      actualResidenceAddress: new FormControl('', [Validators.required]),
      homePhoneNumber: new FormControl(''),
      mobilePhoneNumber: new FormControl(''),
      email: new FormControl(''),
      workPlace: new FormControl(''),
      workPosition: new FormControl(''),
      martialStatus: new FormControl(
        UserMartialStatus.Single as UserMartialStatus,
        [Validators.required]
      ),
      citizenship: new FormControl(UserCitizenship.Belarus as UserCitizenship, [
        Validators.required,
      ]),
      disability: new FormControl(
        UserDisability.DotaPlusPlayer as UserDisability,
        [Validators.required]
      ),
      pensionary: new FormControl(false, [Validators.required]),
      monthlyIncome: new FormControl(null, [Validators.required]),
      conscript: new FormControl(false, [Validators.required]),
    });
  }
}
