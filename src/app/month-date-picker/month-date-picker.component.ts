import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/logger.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-month-date-picker',
  templateUrl: './month-date-picker.component.html',
  styleUrls: ['./month-date-picker.component.css']
})
export class MonthDatePickerComponent implements OnInit {


  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [];
  dateFormStartDate: FormGroup;
  dateFormEndDate: FormGroup;
  startDate: Date;
  endDate: Date;


  constructor(private logger: LoggerService, private formBuilder: FormBuilder) {
    this.dateFormStartDate = this.formBuilder.group({
      selectedMonth: [''],
      selectedYear: [null]
    });
    this.dateFormEndDate = this.formBuilder.group({
      selectedMonth: [''],
      selectedYear: [null]
    });
  }

  ngOnInit(): void {

    const now: Date = new Date();
    const thisYear = now.getFullYear();
    for (let i = 0; i < 11; i++) {
      this.years.push(thisYear - i);
    }
    this.fStart.selectedYear.setValue(thisYear);
    this.fStart.selectedMonth.setValue(this.months[0]);
    this.fEnd.selectedYear.setValue(thisYear);
    this.fEnd.selectedMonth.setValue(this.months[now.getMonth()]);
  }

  get fStart() { return this.dateFormStartDate.controls; }

  get fEnd() { return this.dateFormEndDate.controls; }

  setDate(): void {
    this.startDate = new Date();
    this.startDate.setFullYear(this.fStart.selectedYear.value);
    this.startDate.setMonth(this.months.indexOf(this.fStart.selectedMonth.value));
    this.startDate.setDate(1);
    this.endDate = new Date();
    this.endDate.setFullYear(this.fEnd.selectedYear.value);
    this.endDate.setMonth(this.months.indexOf(this.fEnd.selectedMonth.value));
    this.endDate.setDate(new Date(this.endDate.getFullYear(), this.endDate.getMonth() + 1, 0).getDate());
    this.logger.log('startDate=' + this.startDate + ' endDate=' + this.endDate);
  }

}
