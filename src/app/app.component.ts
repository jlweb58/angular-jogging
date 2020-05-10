import {Component, OnInit} from '@angular/core';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {LoggerService} from './services/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {RunService} from './services/run.service';
import {ChartIntervalType} from './core/models/chart-interval-type';
import {TokenStorageService} from './services/token-storage.service';
import {MonthDatePickerComponent} from './shared/month-date-picker/month-date-picker.component';
import {YearDatePickerComponent} from './shared/year-date-picker/year-date-picker.component';
import {BarChartComponent} from './chart/bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  constructor(private logger: LoggerService,
              private dialog: MatDialog,
              private runService: RunService,
              public tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {

  }

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
    const runs = this.runService.getRunsForDateRange(startDate, endDate);
    const dialogRef = this.dialog.open(BarChartComponent);
    dialogRef.componentInstance.chartIntervalType = chartIntervalType;
    dialogRef.componentInstance.runs = runs;
    dialogRef.componentInstance.startDate = startDate;
    dialogRef.componentInstance.endDate = endDate;
    dialogRef.afterClosed().subscribe(result => {
      this.logger.log('The dialog was closed');
    });
  }

  newRun() {
    const dialogRef = this.dialog.open(RunDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
       this.logger.log('The dialog was closed');
     });
  }

}
