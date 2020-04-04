import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Run} from '../models/run.model';
import {LoggerService} from '../logger/logger.service';


@Component({
  selector: 'app-run-dialog',
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent implements OnInit {

  @Input() run: Run;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  isEdit: boolean;

  constructor(private logger: LoggerService) {
    if (!this.run) {
      this.run = new Run();
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
    this.logger.log('init run dialog');
    this.logger.log('isEdit=' + this.isEdit);
  }

  createRun(event) {
    this.logger.log(this.run.course + ' ' + this.run.date);
  }

  onClose() {
    this.displayChange.emit(false);
  }


}
