import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {RunService} from '../../core/services/run.service';
import {Run} from '../../core/models/run.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-run-table',
  templateUrl: './run-table.component.html',
  styleUrls: ['./run-table.component.css']
})
export class RunTableComponent implements OnInit {
  dataSource = new MatTableDataSource<Run>();
  displayedColumns = ['date', 'activityType', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate', 'shoes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() run: Run;

  constructor(
    private runService: RunService,
    private logger: LoggerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.runService.loadAll();
    this.runService.getRuns().subscribe(results => {
      if (!results) {
        return;
      }
      this.dataSource.data = results;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowClicked(row) {
    this.run = row;
    this.router.navigate(['/run'], {state: {run: this.run}});
   }

}
