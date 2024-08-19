import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import moment from 'moment';

@Directive({
  selector: '[appDateValidator]',

  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateValidatorDirective,
      multi: true,
    },
  ],
})
export class DateValidatorDirective implements Validator {
  @Input('appDateValidator') dateFormat: string = 'YYYY-MM-DD';
  @Input() minDate: Date | undefined = undefined;
  @Input() maxDate: Date | undefined = undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // Validate format
    if (value && !this.isValidFormat(value)) {
      return { invalidDateFormat: true };
    }

    // If only start date is defined
    if (
      this.minDate != undefined &&
      value &&
      !this.isAfterOrEqual(value, this.minDate)
    ) {
      return { outOfRange: true };
    }

    // If only end date is defined
    if (
      this.maxDate != undefined &&
      value &&
      !this.isBeforeOrEqual(value, this.maxDate)
    ) {
      return { outOfRange: true };
    }

    // If both start and end dates are defined
    if (
      this.minDate != undefined &&
      this.maxDate != undefined &&
      value &&
      !this.isInRange(value, this.minDate, this.maxDate)
    ) {
      return { outOfRange: true };
    }

    return null;
  }

  private isValidFormat(value: string): boolean {
    return moment(value, this.dateFormat, true).isValid();
  }

  private isAfterOrEqual(date: string, start: Date): boolean {
    const dateMoment = moment(date, this.dateFormat);
    const startMoment = moment(start);
    return dateMoment.isSameOrAfter(startMoment, 'day');
  }

  private isBeforeOrEqual(date: string, end: Date): boolean {
    const dateMoment = moment(date, this.dateFormat);
    const endMoment = moment(end);
    return dateMoment.isSameOrBefore(endMoment, 'day');
  }

  private isInRange(date: string, start: Date, end: Date): boolean {
    const dateMoment = moment(date, this.dateFormat);
    const startMoment = moment(start);
    const endMoment = moment(end);
    return dateMoment.isBetween(startMoment, endMoment, null, '[]');
  }
}
