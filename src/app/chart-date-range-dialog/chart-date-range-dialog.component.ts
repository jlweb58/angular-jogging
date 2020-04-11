import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-chart-date-range-dialog',
  templateUrl: './chart-date-range-dialog.component.html',
  styleUrls: ['./chart-date-range-dialog.component.css']
})
export class ChartDateRangeDialogComponent implements OnInit {

  public startDate: string;
  public endDate: string;

  constructor(private logger: LoggerService,
              public dialogRef: MatDialogRef<ChartDateRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.title = 'Monthly Chart';
  }
}
