import {Component, OnInit} from '@angular/core';
import {ActivityDialogComponent} from './activity/activity-dialog/activity-dialog.component';
import {LoggerService} from './core/services/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivityService} from './core/services/activity.service';
import {ChartIntervalType} from './core/models/chart-interval-type';
import {TokenStorageService} from './core/services/token-storage.service';
import {MonthDatePickerComponent} from './shared/month-date-picker/month-date-picker.component';
import {YearDatePickerComponent} from './shared/year-date-picker/year-date-picker.component';
import {BarChartComponent} from './chart/bar-chart/bar-chart.component';
import {LineChartComponent} from './chart/line-chart/line-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  constructor(private logger: LoggerService,
              private dialog: MatDialog,
              private runService: ActivityService,
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
      dialogRef = this.dialog.open(MonthDatePickerComponent);
    } else {
      dialogRef = this.dialog.open(YearDatePickerComponent);
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBarChart(dialogRef.componentInstance.startDate, dialogRef.componentInstance.endDate, chartIntervalType);
      }
    });
  }

  showBarChart(startDate: Date, endDate: Date, chartIntervalType: ChartIntervalType) {
    const runs = this.runService.getActivitiesForDateRange(startDate, endDate);
    const dialogRef = this.dialog.open(BarChartComponent);
    dialogRef.componentInstance.chartIntervalType = chartIntervalType;
    dialogRef.componentInstance.runs = runs;
    dialogRef.componentInstance.startDate = startDate;
    dialogRef.componentInstance.endDate = endDate;
  }

  prepareLineChart() {
    const dialogRef = this.dialog.open(MonthDatePickerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLineChart(dialogRef.componentInstance.startDate, dialogRef.componentInstance.endDate);
      }
    });
  }

  showLineChart(startDate: Date, endDate: Date) {
    const runs = this.runService.getActivitiesForDateRange(startDate, endDate);
    const dialogRef = this.dialog.open(LineChartComponent);
    dialogRef.componentInstance.runs = runs;
    dialogRef.componentInstance.startDate = startDate;
    dialogRef.componentInstance.endDate = endDate;
  }

  newRun() {
    this.dialog.open(ActivityDialogComponent);
  }

}
