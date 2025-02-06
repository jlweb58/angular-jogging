import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {LoggerService} from '../../core/services/logger.service';
import {ActivityService} from '../../core/services/activity.service';
import {GearService} from '../../core/services/gear.service';
import {Gear} from '../../core/models/gear.model';
import {FileUploadService} from '../../core/services/file-upload.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {ActivityType, ActivityTypeType} from '../../core/models/activity-type.model';
import {GearType} from '../../core/models/gear-type.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    NgIf,
    NgForOf,
    MatButton,
    DecimalPipe,
    MatDialogActions,
    MatDialogClose
  ]
})
export class ActivityDialogComponent implements OnInit {

  activity: Activity;
  cachedActivity: Activity;
  gpxTrack: string;
  @Output() displayChange = new EventEmitter();
  public isEdit: boolean;
  gears: Gear[];
  selectedGear: Gear = new Gear();
  activityTypes: ActivityTypeType = ActivityType;

  constructor(private logger: LoggerService,
              private activityService: ActivityService,
              private gearService: GearService,
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
    this.gearService.loadAll();
    this.gearService.gear.subscribe(results => {
      if (!results) {
        return;
      }
      this.gears = results.filter(gear => gear.active);

      if (this.isEdit && this.activity.gear) {
        this.selectedGear = this.activity.gear;
      } else {
        this.selectedGear = this.gears.find(gear => gear.preferred);
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

  setSelectedGear() {
    this.selectedGear = this.findGearForActivity(this.activity).find(gear => gear.preferred);
  }

  private getGearForId(id: number) {
    return this.gears.find((gear) => gear.id === id);
  }

  createActivity() {
    const activityDate: Date = new Date(this.activity.date);
    if (this.selectedGear && this.selectedGear.id) {
      this.selectedGear = this.getGearForId(this.selectedGear.id);
      this.activity.gear = this.selectedGear;
    } else {
      this.activity.gear = null;
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

  findGearForActivity(activity: Activity): Gear[] {
    return this.gears.filter(g => g.gearType === this.findGearTypeForActivityType(activity.activityType))
  }

  private findGearTypeForActivityType(activityType: ActivityType): GearType {
    switch (activityType) {
      case ActivityType.Bike: return GearType.Bike;
      case ActivityType.Run: return GearType.Shoes;
      default: return GearType.None;
    }
  }

  onClose() {
    this.displayChange.emit(false);
  }
}
