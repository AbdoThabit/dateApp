import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';
@Component({
  selector: 'app-custom-date-input',
  templateUrl: './custom-date-input.component.html',
  styleUrl: './custom-date-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDateInputComponent),
      multi: true,
    },
  ],
})
export class CustomDateInputComponent
  implements ControlValueAccessor, OnChanges
{
  private innerValue: Date | undefined = undefined;
  private onChange: (value: Date | undefined) => void = () => {};
  private onTouched: () => void = () => {};
  isToched: boolean = false;
  dateString: string = '';
  @Input() startDate: Date | undefined = undefined;
  @Input() endDate: Date | undefined = undefined;
  @Input() dateFormat: string = 'YYYY-MM-DD';
  get value(): Date | undefined {
    return this.innerValue;
  }

  set value(val: Date | undefined) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.onChange(val);
    }
  }

  writeValue(obj: any): void {
    this.innerValue = obj || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
  onInput(): void {
    const dateValue = new Date(this.dateString);
    this.value = dateValue;
  }
  onDateChange(date: Date | undefined) {
    this.value = date;
    this.setDateInStringFormat(date);
  }

  setDateInStringFormat(date: Date | undefined) {
    if (date == undefined) this.dateString = '';
    else {
      this.dateString = moment(date).format(this.dateFormat);
    }
    // this.dateString = moment(date).format(this.dateFormat);
  }
  // setStartDate(dateString: string) {
  //   this.startDate = dateString;
  // }
  // setEndDate(dateString: string) {
  //   this.endDate = dateString;
  // }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['startDate'] || changes['endDate']) {
    //   this.dateString = '';
    //   this.writeValue(null);
    //   console.log('actual Date = ', this.value);
    // }
    if (
      changes['startDate'] &&
      this.startDate != null &&
      this.value != undefined
    ) {
      if (this.value < this.startDate) {
        this.writeValue(null);
        this.dateString = '';
      }
    }
    if (changes['endDate'] && this.endDate != null && this.value != undefined) {
      if (this.value > this.endDate) {
        this.writeValue(null);
        this.dateString = '';
      }
    }
  }

  onBlur(): void {
    this.onTouched();
  }
}
