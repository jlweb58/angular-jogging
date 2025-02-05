import { Component, OnInit } from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {LoggerService} from '../../core/services/logger.service';
import {ActivityService} from '../../core/services/activity.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
    selector: 'app-activity-view',
    templateUrl: './activity-view.component.html',
    styleUrls: ['./activity-view.component.css'],
    standalone: false
})
export class ActivityViewComponent implements OnInit {

  activity: Activity;
  gpxTrack: GpxTrack;

  constructor(private logger: LoggerService,
              private activityService: ActivityService,
              private gpxTrackService: GpxTrackService,
              private dialog: MatDialog) {
  }



  ngOnInit(): void {
    if (!this.activity) {
      this.activity = history.state.activity;
    }
    this.gpxTrackService.getGpxTrack(this.activity).subscribe(data => {
      this.gpxTrack = data;
      }
    );
  }

  editActivity(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Activity.clone(this.activity);
    const dialogRef = this.dialog.open(ActivityDialogComponent, dialogConfig);
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe(result => {
      this.activity = dialogRef.componentInstance.activity;
      this.ngOnInit();
    });
  }

}
