import { Component, OnInit, ViewChild } from '@angular/core';
import { RunService} from '../run.service';
import { Run} from '../models/run.model';

@Component({
  selector: 'app-run-table-new',
  templateUrl: './run-table-new.component.html',
  styleUrls: ['./run-table-new.component.css']
})
export class RunTableNewComponent implements OnInit {
  runs: Run[];
  cols: any[];
  selectedRun: Run;

  constructor(
    private runService: RunService) {
    }

  ngOnInit(): void {
    this.runService.loadAll();
    this.runService.runs.subscribe(results => {
     if (!results) { return; }
     this.runs = results;
     console.log('Loaded runs ' + this.runs.length);

    });

    this.cols = [
      { field: 'date', header: 'Date'},
      { field: 'course', header: 'Course'},
      { field: 'distance', header: 'Distance'},
      { field: 'runDuration.time', header: 'Time', pSortableColumnDisabled: true},
      { field: 'weather', header: 'Weather', pSortableColumnDisabled: true},
      { field: 'comments', header: 'Comments', pSortableColumnDisabled: true},
      { field: 'avgHeartRate', header: 'Avg. Heart Rate', pSortableColumnDisabled: true},

    ];
  }

  onRowSelect(event) {
    console.log('Selected ' + this.selectedRun);
  }

}
