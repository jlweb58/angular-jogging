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
  dateForm: FormGroup;
  selectedDate: Date;



  constructor(private logger: LoggerService, private formBuilder: FormBuilder) {
    this.dateForm = this.formBuilder.group({
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
    this.f.selectedYear.setValue(thisYear);
    this.f.selectedMonth.setValue(this.months[now.getMonth()]);
  }

  get f() { return this.dateForm.controls; }


  setDate(): void {
    this.logger.log('Month: ' + this.f.selectedMonth.value + ' Year: ' + this.f.selectedYear.value);
    this.selectedDate = new Date();
    this.selectedDate.setFullYear(this.f.selectedYear.value);
    this.selectedDate.setMonth(this.months.indexOf(this.f.selectedMonth.value));
    this.selectedDate.setDate(1);
    this.logger.log('selectedDate=' + this.selectedDate);
  }

}
