import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {LoggerService} from '../../core/services/logger.service';
import {ActivityService} from '../../core/services/activity.service';
import {ShoesService} from '../../core/services/shoes.service';
import {Shoes} from '../../core/models/shoes.model';
import {FileUploadService} from '../../core/services/file-upload.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivityType, ActivityTypeType} from '../../core/models/activity-type.model';

@Component({
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {

  activity: Activity;
  cachedActivity: Activity;
  gpxTrack: string;
  @Output() displayChange = new EventEmitter();
  public isEdit: boolean;
  shoes: Shoes[];
  selectedShoe: Shoes = new Shoes();
  activityTypes: ActivityTypeType = ActivityType;

  constructor(private logger: LoggerService,
              private activityService: ActivityService,
              private shoesService: ShoesService,
              private gpxTrackService: GpxTrackService,
              private fileUploadService: FileUploadService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) data) {
    if (!data) {
      this.activity = new Activity();
      this.isEdit = false;
    } else {
      this.activity = data;
      this.cachedActivity = Activity.clone(this.activity);
    }
  }

  ngOnInit(): void {
    this.shoesService.loadAll();
    this.shoesService.shoes.subscribe(results => {
      if (!results) {
        return;
      }
      this.shoes = results.filter(shoe => shoe.active);
      if (this.isEdit && this.activity.shoes) {
        this.selectedShoe = this.activity.shoes;
      } else {
        this.selectedShoe = this.shoes.find(shoe => shoe.preferred);
      }
    });
  }

  async fileInputChange(fileInputEvent: any) {
    if (this.activity != null) {
      this.gpxTrack = await this.fileUploadService.uploadFileToText(fileInputEvent.target.files[0]) as string;
    }
  }

  cancel() {
    this.activity = this.cachedActivity;
  }


  createActivity() {
    const activityDate: Date = new Date(this.activity.date);
    if (this.selectedShoe.id) {
      this.activity.shoes = this.selectedShoe;
    } else {
      this.activity.shoes = null;
    }
    if (this.activity.activityDuration && this.activity.activityDuration.time) {
      this.activity.activityDuration.time = this.correctDurationFormat(this.activity.activityDuration.time);
    }
    if (this.isEdit) {
      if (this.gpxTrack != null) {
        this.gpxTrackService.saveGpxTrack(this.activity, this.gpxTrack).subscribe(track => {
          this.logger.log('saved gpx track');
        });
      }

      this.activityService.update(this.activity);
    } else {
      const activityObservable: Observable<Activity> = this.activityService.create(this.activity);
      activityObservable.subscribe( data => {
        if (this.gpxTrack != null) {
          this.gpxTrackService.saveGpxTrack(data, this.gpxTrack).subscribe( track => {
            this.logger.log('saved gpx track');
            this.router.navigate(['/activity'], {state: {activity: this.activity}});
          });
        }

      });
    }
  }

  correctDurationFormat(durationString: string): string {
    const firstIndex = durationString.indexOf(':');
    const lastIndex = durationString.lastIndexOf(':');
    if (firstIndex === lastIndex) {
      durationString = '00:' + durationString;
    }
    return durationString;
  }

  onClose() {
    this.displayChange.emit(false);
  }

}
