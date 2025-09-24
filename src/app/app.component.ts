import {Component, OnInit} from '@angular/core';
import {LoggerService} from './core/services/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivityService} from './core/services/activity.service';
import {ChartIntervalType} from './core/models/chart-interval-type';
import {TokenStorageService} from './core/services/token-storage.service';
import {MonthDatePickerComponent} from './shared/date-picker/month-date-picker/month-date-picker.component';
import {YearDatePickerComponent} from './shared/date-picker/year-date-picker/year-date-picker.component';
import {BarChartComponent} from './chart/bar-chart/bar-chart.component';
import {LineChartComponent} from './chart/line-chart/line-chart.component';
import {ActivityType} from './core/models/activity-type.model';
import {MatToolbar} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    MatToolbar,
    NgIf,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatIcon,
    MatMenuItem,
    RouterOutlet,
  ]
})
export class AppComponent implements OnInit {

  constructor(private logger: LoggerService,
              private dialog: MatDialog,
              private activityService: ActivityService,
              public tokenStorageService: TokenStorageService) {
  }

  ngOnInit() { }

  prepareBarChartYearly() {
    this.prepareBarChart(ChartIntervalType.Yearly);
  }

  prepareBarChartMonthly() {
    this.prepareBarChart(ChartIntervalType.Monthly);
  }

  prepareBarChart(chartIntervalType: ChartIntervalType) {
    let dialogRef;
    if (chartIntervalType === ChartIntervalType.Monthly) {
      dialogRef = this.dialog.open(MonthDatePickerComponent, {
        height: '530px',
        width: '500px',
      });
    } else {
      dialogRef = this.dialog.open(YearDatePickerComponent, {
        height: '500px',
        width: '350px',
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBarChart(dialogRef.componentInstance.startDate, dialogRef.componentInstance.endDate, chartIntervalType, dialogRef.componentInstance.selectedActivityType);
      }
    });
  }

  showBarChart(startDate: Date, endDate: Date, chartIntervalType: ChartIntervalType, activityType: ActivityType) {
    const activities = this.activityService.getActivitiesForDateRange(startDate, endDate);
    const dialogRef = this.dialog.open(BarChartComponent);
    dialogRef.componentInstance.chartIntervalType = chartIntervalType;
    dialogRef.componentInstance.activities = activities;
    dialogRef.componentInstance.startDate = startDate;
    dialogRef.componentInstance.endDate = endDate;
    dialogRef.componentInstance.selectedActivityType = activityType;
  }

  prepareLineChart() {
    const dialogRef = this.dialog.open(MonthDatePickerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLineChart(dialogRef.componentInstance.startDate, dialogRef.componentInstance.endDate,
          dialogRef.componentInstance.selectedActivityType);
      }
    });
  }

  showLineChart(startDate: Date, endDate: Date, activityType: ActivityType) {
    const activities = this.activityService.getActivitiesForDateRange(startDate, endDate);
    const dialogRef = this.dialog.open(LineChartComponent);
    dialogRef.componentInstance.activities = activities;
    dialogRef.componentInstance.startDate = startDate;
    dialogRef.componentInstance.endDate = endDate;
    dialogRef.componentInstance.selectedActivityType = activityType;

  }

}
