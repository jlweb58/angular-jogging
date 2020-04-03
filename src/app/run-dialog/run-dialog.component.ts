import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Run} from '../models/run.model';


@Component({
  selector: 'app-run-dialog',
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent implements OnInit {

  run: Run;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
    this.run = new Run();
    console.log('init run dialog');
  }

  createRun(event) {
    console.log(this.run.course + ' ' + this.run.date);
  }

  onClose(){
    this.displayChange.emit(false);
  }


}
