import { Component, OnInit } from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {LoggerService} from '../../core/services/logger.service';
import {ActivityService} from '../../core/services/activity.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfirmationDialog} from '../../shared/components/confirm-dialog.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MapViewComponent} from '../../shared/map-view/map-view.component';
import {NgIf} from '@angular/common';
import {FeedbackDialog} from '../../shared/components/feedback-dialog.component';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css'],
  imports: [
    MatIconButton,
    MatIcon,
    MatButton,
    MapViewComponent,
    NgIf
  ]
})
export class ActivityViewComponent implements OnInit {

  activity: Activity;
  gpxTrack: GpxTrack;

  constructor(private logger: LoggerService,
              private activityService: ActivityService,
              private gpxTrackService: GpxTrackService,
              private router: Router,
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

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

  deleteActivity(): void {
    const confirmDialog = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Confirm Activity Deletion',
        message: `Are you sure you want to delete this activity: ${this.activity.course}?`,
      }, panelClass: 'custom-dialog-container',
      });

    confirmDialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.activityService.delete(this.activity).subscribe({
          next: () => {
            this.dialog.open(FeedbackDialog,{
              data: {
                title: 'Delete Activity',
                message: `Activity ${this.activity.course} was deleted successfully.`,
              }, panelClass: 'custom-dialog-container',
              }).afterClosed().subscribe(confirmed => this.goBack());
          },
          error() {
            console.log('Delete error');
          }
        })
      }
    });
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
