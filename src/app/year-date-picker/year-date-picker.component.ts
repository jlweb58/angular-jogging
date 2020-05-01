import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoggerService} from '../services/logger.service';

@Component({
  selector: 'app-year-date-picker',
  templateUrl: './year-date-picker.component.html',
  styleUrls: ['./year-date-picker.component.css']
})
export class YearDatePickerComponent implements OnInit {

  years: number[] = [];
  dateFormStartDate: FormGroup;
  dateFormEndDate: FormGroup;
  startDate: Date;
  endDate: Date;

  constructor(private logger: LoggerService, private formBuilder: FormBuilder) {
    this.dateFormStartDate = this.formBuilder.group({
      selectedYear: [null]
    });
    this.dateFormEndDate = this.formBuilder.group({
      selectedYear: [null]
    });
  }

  ngOnInit(): void {
    const now: Date = new Date();
    const thisYear = now.getFullYear();
    for (let i = 0; i < 21; i++) {
      this.years.push(thisYear - i);
    }
    this.fStart.selectedYear.setValue(thisYear);
    this.fEnd.selectedYear.setValue(thisYear);
  }

  get fStart() { return this.dateFormStartDate.controls; }

  get fEnd() { return this.dateFormEndDate.controls; }

  setDate(): void {
    this.startDate = new Date();
    this.startDate.setFullYear(this.fStart.selectedYear.value);
    this.startDate.setMonth(0);
    this.startDate.setDate(1);
    this.endDate = new Date();
    this.endDate.setFullYear(this.fEnd.selectedYear.value);
    this.endDate.setMonth(11);
    this.endDate.setDate(31);
    this.logger.log('startDate=' + this.startDate + ' endDate=' + this.endDate);
  }
}
