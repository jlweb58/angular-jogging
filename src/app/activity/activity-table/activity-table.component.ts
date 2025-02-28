import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivityService} from '../../core/services/activity.service';
import {Activity} from '../../core/models/activity.model';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {LoggerService} from '../../core/services/logger.service';
import {Router} from '@angular/router';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css'],
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatPaginator,
    MatHeaderRow,
    MatHeaderRowDef,
    MatCellDef,
    MatRow,
    MatRowDef,
    MatSortModule,
    DurationPipe,
    MatFabButton,
    MatIcon,
  ]
})
export class ActivityTableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Activity>();
  displayedColumns = ['date', 'activityType', 'course', 'distance', 'time', 'weather', 'comments', 'avgheartrate', 'gear'];
  private readonly destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() activity = new EventEmitter<Activity>();

  constructor(
    private activityService: ActivityService,
    private logger: LoggerService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activityService.loadAll().pipe(
      // Filter out null/undefined results
      filter((results): results is Activity[] => !!results),
      // Complete when component is destroyed
      takeUntil(this.destroy$)
    ).subscribe({
      next: (activities) => {
        this.dataSource.data = activities;
        // Only set paginator and sort after ViewInit
        Promise.resolve().then(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (error) => {
        this.logger.log('Failed to load activities: ' + error.message());
        // Handle error appropriately - maybe show a message to the user
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onRowClicked(row) {
    this.activity = row;
    this.router.navigate(['/activity'], {state: {activity: this.activity}});
   }

  newActivity() {
    this.dialog.open(ActivityDialogComponent);
  }


}
