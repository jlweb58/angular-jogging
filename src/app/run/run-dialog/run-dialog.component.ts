import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Run} from '../../core/models/run.model';
import {LoggerService} from '../../core/services/logger.service';
import {RunService} from '../../core/services/run.service';
import {ShoesService} from '../../core/services/shoes.service';
import {Shoes} from '../../core/models/shoes.model';
import {FileUploadService} from '../../core/services/file-upload.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent implements OnInit {

  run: Run;
  cachedRun: Run;
  gpxTrack;
  @Output() displayChange = new EventEmitter();
  public isEdit: boolean;
  shoes: Shoes[];
  selectedShoe: Shoes = new Shoes();

  constructor(private logger: LoggerService,
              private runService: RunService,
              private shoesService: ShoesService,
              private gpxTrackService: GpxTrackService,
              private fileUploadService: FileUploadService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) data) {
    if (!data) {
      this.run = new Run();
      this.isEdit = false;
    } else {
      this.run = data;
      this.cachedRun = Run.clone(this.run);
    }
  }

  ngOnInit(): void {
    this.shoesService.loadAll();
    this.shoesService.shoes.subscribe(results => {
      if (!results) {
        return;
      }
      this.shoes = results.filter(shoe => shoe.active);
      if (this.isEdit && this.run.shoes) {
        this.selectedShoe = this.run.shoes;
      } else {
        this.selectedShoe = this.shoes.find(shoe => shoe.preferred);
      }
    });
  }

  async fileInputChange(fileInputEvent: any) {
    if (this.run != null) {
      this.gpxTrack = await this.fileUploadService.uploadFileToText(fileInputEvent.target.files[0]);
    }
  }

  cancel() {
    this.run = this.cachedRun;
  }


  createRun(event) {
    const runDate: Date = new Date(this.run.date);
    if (this.selectedShoe.id) {
      this.run.shoes = this.selectedShoe;
    } else {
      this.run.shoes = null;
    }
    if (this.run.runDuration && this.run.runDuration.time) {
      this.run.runDuration.time = this.correctDurationFormat(this.run.runDuration.time);
    }
    if (this.isEdit) {
      if (this.gpxTrack != null) {
        this.gpxTrackService.saveGpxTrack(this.run, this.gpxTrack).subscribe( track => {
          this.logger.log('saved gpx track');
        });
      }

      this.runService.update(this.run);
    } else {
      const runObservable: Observable<Run> = this.runService.create(this.run);
      runObservable.subscribe( data => {
        if (this.gpxTrack != null) {
          this.gpxTrackService.saveGpxTrack(data, this.gpxTrack).subscribe( track => {
            this.logger.log('saved gpx track');
            this.router.navigate(['/run'], {state: {run: this.run}});
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
