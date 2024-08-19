import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html',
  styleUrl: './date-view.component.scss',
})
export class DateViewComponent implements OnChanges {
  @Input() dateFormat: string = 'YYYY-MM-DD';
  @Output() dateChange = new EventEmitter<Date | undefined>();
  dateValue: string = '';
  currentDate: Date = new Date();
  firstDayOFTheMonth: Date = new Date();
  firstDayOfTheCurrentMonthName: string;
  firstDayInClender: Date = new Date();
  selectedDate: Date | undefined = undefined;
  allDates: Date[][] = [];
  monthName: string = this.currentDate.toLocaleString('en-US', {
    month: 'long',
  });
  @Input() startDate: Date | undefined = undefined;
  @Input() endDate: Date | undefined = undefined;
  @Input() startDateString: string = '';
  @Input() endDateString: string = '';
  currentYear: number = this.currentDate.getFullYear();
  selectedYear: number = this.currentYear;
  firstYearInlist: number = this.currentDate.getFullYear() - 4;
  lastYearInlist: number = this.currentDate.getFullYear() + 5;
  allYears: number[] = [];
  displayDayClenderView: boolean = true;
  displyMonthsView: boolean = false;
  displyYearsView: boolean = false;
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor() {
    this.firstDayOFTheMonth.setDate(1);
    this.firstDayOfTheCurrentMonthName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(this.firstDayOFTheMonth);
    this.setFirstDayInClelender();
    this.SeedDates();
    this.setAllyears();
  }

  setFirstDayInClelender() {
    const dayOffset: {
      [key in
        | 'Sunday'
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday']: number;
    } = {
      Sunday: 0,
      Monday: -1,
      Tuesday: -2,
      Wednesday: -3,
      Thursday: -4,
      Friday: -5,
      Saturday: -6,
    };
    const offset =
      dayOffset[this.firstDayOfTheCurrentMonthName as keyof typeof dayOffset];
    this.firstDayInClender = new Date(this.firstDayOFTheMonth);
    this.firstDayInClender.setDate(this.firstDayOFTheMonth.getDate() + offset);
  }

  SeedDates(): void {
    const totalDays = 42;
    const daysPerRow = 7;
    this.allDates = [];

    for (let i = 0; i < totalDays; i += daysPerRow) {
      const row: Date[] = [];
      for (let j = 0; j < daysPerRow; j++) {
        let currentDate = new Date(this.firstDayInClender);
        currentDate.setDate(this.firstDayInClender.getDate() + i + j);
        row.push(currentDate);
      }
      this.allDates.push(row);
    }
  }
  setMontAndYearhName() {
    this.monthName = this.firstDayOFTheMonth.toLocaleString('en-US', {
      month: 'long',
    });

    this.selectedYear = this.firstDayOFTheMonth.getFullYear();
  }
  next() {
    let monthNum = this.firstDayOFTheMonth.getMonth();
    let years = this.firstDayOFTheMonth.getFullYear();
    if (monthNum == 11) {
      monthNum = 0;
      years++;
    } else {
      monthNum++;
    }
    this.firstDayOFTheMonth = new Date(years, monthNum, 1);
    this.dateMovement();
  }
  back() {
    let monthNum = this.firstDayOFTheMonth.getMonth();
    let years = this.firstDayOFTheMonth.getFullYear();
    if (monthNum == 0) {
      monthNum = 11;
      years--;
    } else {
      monthNum--;
    }
    this.firstDayOFTheMonth = new Date(years, monthNum, 1);
    this.dateMovement();
  }
  onDateSelected(date: Date) {
    if (this.isAvailableDate(date)) {
      this.selectedDate = date;
      this.selectedDate.setHours(0, 0, 0, 0);
      this.dateValue = moment(this.selectedDate).format(this.dateFormat);
      this.dateChange.emit(this.selectedDate);
    }
  }
  compareDates(date1: Date | undefined, date2: Date): boolean {
    if (date1 != undefined)
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    return false;
  }
  setDateforinput() {
    this.dateValue = moment(this.selectedDate).format(this.dateFormat);
  }
  isCurrentMonthDays(date: Date): boolean {
    return (
      date.getFullYear() == this.firstDayOFTheMonth.getFullYear() &&
      date.getMonth() == this.firstDayOFTheMonth.getMonth()
    );
  }
  isCuurentMonth(monthString: string) {
    return (
      this.currentDate.getMonth() == this.months.indexOf(monthString) &&
      this.currentYear == this.selectedYear
    );
  }
  isCurrentYear(year: number) {
    return this.currentYear == year;
  }
  onMonthChange(monthString: string) {
    const montNum = this.months.indexOf(monthString);
    this.firstDayOFTheMonth.setMonth(montNum);
    this.dateMovement();
    this.displayDayClender();
  }
  dateMovement() {
    this.firstDayOfTheCurrentMonthName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(this.firstDayOFTheMonth);
    this.setFirstDayInClelender();
    this.SeedDates();
    this.setMontAndYearhName();
    this.setMontAndYearhName();
  }
  toNextYear() {
    this.selectedYear++;

    this.firstDayOFTheMonth.setFullYear(this.selectedYear);
    this.dateMovement();
  }
  backToLastYear() {
    this.selectedYear--;

    this.firstDayOFTheMonth.setFullYear(this.selectedYear);
    this.dateMovement();
  }
  setAllyears() {
    this.allYears = []; // Ensure the array is empty before adding years
    for (let i = this.firstYearInlist; i <= this.lastYearInlist; i++) {
      this.allYears.push(i);
    }
  }
  nextDecade() {
    this.firstYearInlist += 10;
    this.lastYearInlist += 10;
    this.setAllyears();
  }
  backDecade() {
    this.firstYearInlist -= 10;
    this.lastYearInlist -= 10;
    this.setAllyears();
  }
  changeYear(year: number) {
    this.firstDayOFTheMonth.setFullYear(year);
    this.dateMovement();
    this.displayMonthClender();
  }
  displayDayClender() {
    this.displayDayClenderView = true;
    this.displyMonthsView = false;
    this.displyYearsView = false;
  }
  displayMonthClender() {
    this.displayDayClenderView = false;
    this.displyMonthsView = true;
    this.displyYearsView = false;
  }
  displayYearClender() {
    this.displayDayClenderView = false;
    this.displyMonthsView = false;
    this.displyYearsView = true;
  }
  isAvailableDate(date: Date) {
    if (this.startDate != undefined && this.endDate != undefined)
      return date >= this.startDate && date <= this.endDate;
    if (this.startDate != undefined && this.endDate == undefined)
      return date >= this.startDate;
    if (this.startDate == undefined && this.endDate != undefined)
      return date <= this.endDate;

    return true;
  }
  setTheStartAndEndDates() {
    if (this.startDate != undefined) {
      this.startDate.setHours(0, 0, 0, 0);
    }

    if (this.endDate != undefined) {
      this.endDate.setHours(23, 59, 59, 59);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] && this.startDate != undefined) {
      this.startDate?.setHours(0, 0, 0, 0);
      if (this.selectedDate != undefined && this.selectedDate < this.startDate)
        this.selectedDate = undefined;
    }
    if (changes['endDate'] && this.endDate != undefined) {
      this.endDate?.setHours(23, 59, 59, 59);
      if (this.selectedDate != undefined && this.selectedDate < this.endDate)
        this.selectedDate = undefined;
    }
  }
}
