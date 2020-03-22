import {Component, Input, OnInit} from '@angular/core';
import {Run} from '../models/run.model';

@Component({
  selector: 'app-run-dialog',
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent implements OnInit {

  run: Run;

  constructor() {

  }

  ngOnInit(): void {
    this.run = new Run();
  }

  createRun(event) {
    console.log(this.run.course + ' ' + this.run.date);
  }


}
