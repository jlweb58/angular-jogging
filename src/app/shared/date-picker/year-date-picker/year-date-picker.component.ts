import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../../core/services/logger.service';
import {ActivityType} from '../../../core/models/activity-type.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialogClose} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-year-date-picker',
  templateUrl: './year-date-picker.component.html',
  styleUrls: ['../date-picker.component.css'],
  imports: [
    FormsModule,
    NgForOf,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect
  ]
})
export class YearDatePickerComponent implements OnInit {

  years: number[] = [];
  startDate: Date;
  endDate: Date;
  selectedStartYear: number;
  selectedEndYear: number;
  activityTypes: ActivityType[] = [ActivityType.Run, ActivityType.Bike, ActivityType.Hike, ActivityType.Swim];
  selectedActivityType: ActivityType;

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
    this.selectedActivityType = ActivityType.Run;
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
  }
}
