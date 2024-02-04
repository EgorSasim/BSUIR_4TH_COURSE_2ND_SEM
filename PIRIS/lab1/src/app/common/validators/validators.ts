import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('control: ', control);
    const valueLen = control.value?.toString()?.trim().length;
    console.log('len: ', valueLen);
    return valueLen ? null : { emptyStr: true };
  };
}
