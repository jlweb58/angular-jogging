import { Component, OnInit } from '@angular/core';
import {Run} from '../../core/models/run.model';
import {LoggerService} from '../../core/services/logger.service';
import {RunService} from '../../core/services/run.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackService} from '../../core/services/gpx-track.service';

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
              private gpxTrackService: GpxTrackService) {
  }



  ngOnInit(): void {
    this.run = history.state.run;
    this.gpxTrackService.getGpxTrack(this.run).subscribe( data => {
      this.gpxTrack = data;
      this.logger.log('Got GPX track, ' + this.gpxTrack);
      }
    );
    this.logger.log('Our run is ' + this.run.course);
    this.logger.log('GPX Track: ' + this.gpxTrack !== null);
    this.logger.log('GPX Track elements: ' + this.gpxTrack.gpxTrackElements.length);
  }

}
