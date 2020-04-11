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

  prepareBarChart() {
    const dialogRef = this.dialog.open(ChartDateRangeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logger.log('Drawing chart');
        this.showBarChart(dialogRef.componentInstance.startDate, dialogRef.componentInstance.endDate);
      }
    });
  }

  showBarChart(startDate: string, endDate: string) {
    const localStartDate = new Date(startDate + 'T00:00:00Z');
    const localEndDate = new Date(endDate + 'T00:00:00Z');
    const runs = this.runService.getRunsForDateRange(localStartDate, localEndDate);
    const dialogRef = this.dialog.open(BarChartComponent);
    dialogRef.componentInstance.chartIntervalType = ChartIntervalType.Monthly;
    dialogRef.componentInstance.runs = runs;
    dialogRef.componentInstance.startDate = localStartDate;
    dialogRef.componentInstance.endDate = localEndDate;
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
