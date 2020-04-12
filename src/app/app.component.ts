import {Component, OnInit} from '@angular/core';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {LoggerService} from './logger/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {ChartDateRangeDialogComponent} from './chart-date-range-dialog/chart-date-range-dialog.component';
import {RunService} from './run.service';
import {ChartIntervalType} from './models/chart-interval-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  constructor(private logger: LoggerService, private dialog: MatDialog, private runService: RunService) {
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
    const dialogRef = this.dialog.open(ChartDateRangeDialogComponent);
    dialogRef.componentInstance.chartIntervalType = chartIntervalType;
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
