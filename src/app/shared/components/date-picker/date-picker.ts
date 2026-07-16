import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Calendar } from 'lucide-angular';


@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]

})

export class DatePickerComponent implements ControlValueAccessor {

  // ✅ SINGLE STATE ONLY
  selectedDate: Date | null = null;

  isOpen = false;
  showMonth = false;
  showYear = false;

  days: (Date | null)[] = [];

  months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  years: number[] = [];

  viewMonth = new Date().getMonth();
  viewYear = new Date().getFullYear();

  CalendarDays = Calendar;

  // ✅ CVA functions (ONLY ONCE)
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {
    this.generateYears();
    this.generateCalendar();
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedDate = new Date(value);
      this.viewMonth = this.selectedDate.getMonth();
      this.viewYear = this.selectedDate.getFullYear();
    } else {
      this.selectedDate = null;
    }

    this.generateCalendar();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  // ✅ USER SELECT DATE
  selectDate(day: Date) {
    this.selectedDate = day;

    const formatted = day.toISOString().split('T')[0];

    this.onChange(formatted);
    this.onTouched();

    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  generateYears() {
    const currentYear = new Date().getFullYear();

    this.years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  changeMonth(month: number) {
    this.viewMonth = month;
    this.generateCalendar();
  }

  changeYear(year: number) {
    this.viewYear = year;
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.viewYear, this.viewMonth, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    this.days = [];

    for (let i = 0; i < startDay; i++) {
      this.days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      this.days.push(new Date(this.viewYear, this.viewMonth, d));
    }
  }

  formatDate(date: Date) {
    return date.toLocaleDateString('en-GB');
  }
}