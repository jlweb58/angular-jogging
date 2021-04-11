import { Component, OnInit } from '@angular/core';
import {Run} from '../../core/models/run.model';
import {LoggerService} from '../../core/services/logger.service';
import {RunService} from '../../core/services/run.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-run-view',
  templateUrl: './run-view.component.html',
  styleUrls: ['./run-view.component.css']
})
export class RunViewComponent implements OnInit {

  run: Run;
  gpxTrack: GpxTrack;

  constructor(private logger: LoggerService,
              private runService: RunService,
              private gpxTrackService: GpxTrackService,
              private dialog: MatDialog) {
  }



  ngOnInit(): void {
    if (!this.run) {
      this.run = history.state.run;
    }
    this.gpxTrackService.getGpxTrack(this.run).subscribe( data => {
      this.gpxTrack = data;
      }
    );
  }

  editRun(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Run.clone(this.run);
    const dialogRef = this.dialog.open(RunDialogComponent, dialogConfig);
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe(result => {
      this.run = dialogRef.componentInstance.run;
      this.ngOnInit();
    });
  }

}
