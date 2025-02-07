import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {LoggerService} from '../../core/services/logger.service';
import {ActivityService} from '../../core/services/activity.service';
import {GearService} from '../../core/services/gear.service';
import {Gear} from '../../core/models/gear.model';
import {FileUploadService} from '../../core/services/file-upload.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {EMPTY, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {ActivityType, ActivityTypeType} from '../../core/models/activity-type.model';
import {GearType} from '../../core/models/gear-type.model';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {catchError, map, switchMap} from 'rxjs/operators';

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
    MatDatepickerModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    NgIf,
    NgForOf,
    MatButton,
    DecimalPipe,
    MatDialogActions,
    MatDialogClose,
    MatHint
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityDialogComponent implements OnInit {

  displayDuration: string = '';
  cachedActivity: Activity;
  gpxTrack: string;
  @Output() displayChange = new EventEmitter();
  public isEdit: boolean;
  gears: Gear[];
  selectedGear: Gear = new Gear();
  activityTypes: ActivityTypeType = ActivityType;

  private _activity: Activity;
  @Input() set activity(value: Activity) {
    this._activity = value;
    this.displayDuration = DurationPipe.formatDuration(value.duration)
  }
  get activity(): Activity {
    return this._activity;
  }

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

  createOrEditActivity() {
    if (this.selectedGear && this.selectedGear.id) {
      this.selectedGear = this.getGearForId(this.selectedGear.id);
      this.activity.gear = this.selectedGear;
    } else {
      this.activity.gear = null;
    }
    if (this.activity.duration) {
      this.activity.duration = this.convertToIsoDuration(this.activity.duration);
    }
    if (this.isEdit) {
      this.activityService.update(this.activity);
      if (this.gpxTrack) {
        this.gpxTrackService.saveGpxTrack(this.activity, this.gpxTrack)
          .pipe(
            catchError(error => {
              this.logger.error('Failed to save GPX track', error);
              return EMPTY;
            })
          )
          .subscribe(() => this.logger.log('saved gpx track'));
      }
    } else {
      this.activityService.create(this.activity).pipe(
        switchMap(data => {
          if (this.gpxTrack) {
            return this.gpxTrackService.saveGpxTrack(data, this.gpxTrack).pipe(
              map(track => ({ activity: data, track }))
            );
          }
          return of({ activity: data });
        }),
        catchError(error => {
          this.logger.error('Failed to create activity or save GPX track', error);
          return EMPTY;
        })
      ).subscribe(result => {
        this.logger.log('Activity created successfully');
        this.router.navigate(['/activity'], { state: { activity: result.activity }});
      });
    }
  }

  onDurationChange(value: string) {
    // Parse the user input (MM:SS or HH:MM:SS format)
    const parts = value.split(':').map(Number);
    let hours = 0, minutes = 0, seconds = 0;

    if (parts.length === 3) {
      [hours, minutes, seconds] = parts;
    } else if (parts.length === 2) {
      [minutes, seconds] = parts;
    }

    // Convert to ISO duration format
    this.activity.duration = `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}${seconds ? seconds + 'S' : ''}`;
  }

  private convertToIsoDuration(duration: string): string {
    // If it's already in ISO format, return it
    if (duration.startsWith('PT')) {
      return duration;
    }

    // Split the time string
    const parts = duration.split(':').map(Number);
    let hours = 0, minutes = 0, seconds = 0;

    if (parts.length === 3) {
      [hours, minutes, seconds] = parts;
    } else if (parts.length === 2) {
      [minutes, seconds] = parts;
    } else {
      // Handle invalid format
      return duration; // or throw error
    }

    // Build ISO duration string
    return `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}${seconds ? seconds + 'S' : ''}`;
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
}
