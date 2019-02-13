import { FormControl, Validators } from '@angular/forms';

const regex = /[^\s\w,.:&\/()+%'`@-]/;

export class CustomValidator extends Validators {

  static email(control: FormControl) {
    // tslint:disable-next-line:max-line-length
    const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (REGEX.test(control.value)) {
      return null;
    }

    return {
      email: true
    };
  }

  static mobile(control: FormControl) {
    // tslint:disable-next-line:max-line-length
    const REGEX = /^[6-9]\d{9}$/;

    if (REGEX.test(control.value)) {
      return null;
    }

    return {
      mobile: true
    };
  }

  // Validates numbers
  static number(number): any {
    if (number.pristine) {
      return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    if (NUMBER_REGEXP.test(number.value)) {
      return null;
    }
    return {
      number: true
    };
  }
}
