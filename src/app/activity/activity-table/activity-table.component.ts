import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ActivityService} from '../../core/services/activity.service';
import {Activity} from '../../core/models/activity.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {
  dataSource = new MatTableDataSource<Activity>();
  displayedColumns = ['date', 'activityType', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate', 'gear'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() activity: Activity;

  constructor(
    private activityService: ActivityService,
    private logger: LoggerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activityService.loadAll();
    this.activityService.getActivities().subscribe(results => {
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
    this.activity = row;
    this.router.navigate(['/activity'], {state: {activity: this.activity}});
   }

}
