import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueLen = control.value?.toString()?.trim().length;
    return valueLen ? null : { emptyStr: true };
  };
}
