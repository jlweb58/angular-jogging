import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';

@Component({
  selector: 'app-month-date-picker',
  templateUrl: './month-date-picker.component.html',
  styleUrls: ['./month-date-picker.component.css']
})
export class MonthDatePickerComponent implements OnInit {


  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [];
  startDate: Date;
  endDate: Date;
  selectedStartMonth: string;
  selectedStartYear: number;
  selectedEndMonth: string;
  selectedEndYear: number;

  constructor(private logger: LoggerService) {

  }

  ngOnInit(): void {

    const now: Date = new Date();
    const thisYear = now.getFullYear();
    for (let i = 0; i < 11; i++) {
      this.years.push(thisYear - i);
    }
    this.selectedStartYear = thisYear;
    this.selectedStartMonth = this.months[0];
    this.selectedEndYear = thisYear;
    this.selectedEndMonth = this.months[now.getMonth()];
  }

  setDate(): void {
    this.startDate = new Date();
    this.startDate.setFullYear(this.selectedStartYear);
    this.startDate.setMonth(this.months.indexOf(this.selectedStartMonth));
    this.startDate.setDate(1);
    this.endDate = new Date();
    this.endDate.setFullYear(this.selectedEndYear);
    this.endDate.setMonth(this.months.indexOf(this.selectedEndMonth));
    this.endDate.setDate(new Date(this.endDate.getFullYear(), this.endDate.getMonth() + 1, 0).getDate());
    this.logger.log('startDate=' + this.startDate + ' endDate=' + this.endDate);
  }

}
