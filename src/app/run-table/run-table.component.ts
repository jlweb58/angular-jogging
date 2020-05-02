import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {RunService} from '../services/run.service';
import {Run} from '../models/run.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {LoggerService} from '../services/logger.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-run-table',
  templateUrl: './run-table.component.html',
  styleUrls: ['./run-table.component.css']
})
export class RunTableComponent implements OnInit {
  dataSource = new MatTableDataSource<Run>();
  displayedColumns = ['date', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate', 'shoes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() run: Run;

  constructor(
    private runService: RunService,
    private logger: LoggerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.runService.loadAll();
    this.runService.runs.subscribe(results => {
      if (!results) { return; }
      this.dataSource.data = results;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.logger.log('Loaded runs');

    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowClicked(row) {
    this.run = row;
    this.logger.log('Clicked ' + this.run.id + ' ' + this.run.date);
    const dialogRef = this.dialog.open(RunDialogComponent);
    dialogRef.componentInstance.run = this.run;
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe(result => {
      this.logger.log('The dialog was closed');
    });
  }

}
