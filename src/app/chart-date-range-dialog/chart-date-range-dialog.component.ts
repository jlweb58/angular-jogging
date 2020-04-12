import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoggerService} from '../logger/logger.service';
import {ChartIntervalType} from '../models/chart-interval-type';

@Component({
  selector: 'app-chart-date-range-dialog',
  templateUrl: './chart-date-range-dialog.component.html',
  styleUrls: ['./chart-date-range-dialog.component.css']
})
export class ChartDateRangeDialogComponent implements OnInit {

  public startDate = new Date();
  public endDate = new Date();
  public chartIntervalType: ChartIntervalType;

  constructor(private logger: LoggerService,
              public dialogRef: MatDialogRef<ChartDateRangeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public title: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.chartIntervalType === ChartIntervalType.Monthly) {
      this.title = 'Monthly Chart';
    } else {
      this.title = 'Yearly Chart';
    }
  }
}
