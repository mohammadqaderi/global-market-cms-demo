import {FormGroup} from '@angular/forms';

export function MatchDuration(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (control.errors && !control.errors.mustMatch) {
      return;
    }

    if (isValidPattern(control.value)) {
      return control.setErrors({matchDuration: true});
    } else {
      control.setErrors({matchDuration: null});
    }

  };
}

function isValidPattern(value: string) {
  if (value) {
    const pattern = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
    return pattern.test(value);
  } else
    return false;
}
