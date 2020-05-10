import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';

@Component({
  selector: 'app-year-date-picker',
  templateUrl: './year-date-picker.component.html',
  styleUrls: ['./year-date-picker.component.css']
})
export class YearDatePickerComponent implements OnInit {

  years: number[] = [];
  startDate: Date;
  endDate: Date;
  selectedStartYear: number;
  selectedEndYear: number;

  constructor(private logger: LoggerService) {

  }

  ngOnInit(): void {
    const now: Date = new Date();
    const thisYear = now.getFullYear();
    for (let i = 0; i < 21; i++) {
      this.years.push(thisYear - i);
    }
    this.selectedStartYear = thisYear;
    this.selectedEndYear = thisYear;
  }

  setDate(): void {
    this.startDate = new Date();
    this.startDate.setFullYear(this.selectedStartYear);
    this.startDate.setMonth(0);
    this.startDate.setDate(1);
    this.endDate = new Date();
    this.endDate.setFullYear(this.selectedEndYear);
    this.endDate.setMonth(11);
    this.endDate.setDate(31);
    this.logger.log('startDate=' + this.startDate + ' endDate=' + this.endDate);
  }
}
