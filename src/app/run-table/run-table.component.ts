import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { RunService} from '../run.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Run} from '../models/run.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-run-table',
  templateUrl: './run-table.component.html',
  styleUrls: ['./run-table.component.css']
})
export class RunTableComponent implements OnInit {
  runs: Run[];
  dataSource = new MatTableDataSource<Run>(this.runs);
  displayedColumns = ['date', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedRun: Run;
  runDialog: RunDialogComponent;

  constructor(
    private runService: RunService,
    private logger: LoggerService
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

  showNewRunDialog() {
    this.logger.log('New run dialog works');
  }

  onRowClicked(row) {
    this.logger.log('Clicked ' + this.selectedRun.id + ' ' + this.selectedRun.date);
  }

  onRowSelect(event) {
    this.logger.log('Selected ' + this.selectedRun.id + ' ' + this.selectedRun.date);
  }

}
