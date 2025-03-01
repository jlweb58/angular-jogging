import {Component, OnInit} from '@angular/core';
import {ActivityType} from '../../../core/models/activity-type.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialogClose} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-month-date-picker',
  templateUrl: './month-date-picker.component.html',
  styleUrls: ['../date-picker.component.css'],
  imports: [
    FormsModule,
    NgForOf,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ]
})
export class MonthDatePickerComponent implements OnInit {


  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [];
  activityTypes: ActivityType[] = [ActivityType.Run, ActivityType.Bike, ActivityType.Hike, ActivityType.Swim];
  startDate: Date;
  endDate: Date;
  selectedStartMonth: string;
  selectedStartYear: number;
  selectedEndMonth: string;
  selectedEndYear: number;
  selectedActivityType: ActivityType;

  constructor() {

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
    this.selectedActivityType = ActivityType.Run;
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
  }

}
