import {Component, OnInit, ViewChild} from '@angular/core';
import { RunService} from '../run.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Run} from '../models/run.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-run-table',
  templateUrl: './run-table.component.html',
  styleUrls: ['./run-table.component.css']
})
export class RunTableComponent implements OnInit {
  //  dataSource = new RunDataSource(this.runService);
  runs: Run[];
  dataSource = new MatTableDataSource<Run>(this.runs);
  displayedColumns = ['date', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private runService: RunService
  ) { }

  ngOnInit(): void {
    this.runService.loadAll();
    this.runService.runs.subscribe(results => {
      if (!results) { return; }
      this.dataSource.data = results;
      this.dataSource.paginator = this.paginator;
      console.log('Loaded runs');

    });

  }

  onRowClicked(row) {

  }




}

