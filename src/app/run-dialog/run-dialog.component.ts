import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Run} from '../models/run.model';
import {LoggerService} from '../logger/logger.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RunService} from '../run.service';
import {ShoesService} from '../shoes.service';
import {Shoes} from '../models/shoes.model';

@Component({
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.css']
})
export class RunDialogComponent implements OnInit {

  run: Run;
  @Output() displayChange = new EventEmitter();
  public isEdit: boolean;
  shoes: Shoes[];
  selectedShoe: Shoes = new Shoes();

  constructor(private logger: LoggerService,
              private runService: RunService,
              private shoesService: ShoesService,
              private dialogRef: MatDialogRef<RunDialogComponent> ) {
    if (!this.run) {
      this.run = new Run();
      this.isEdit = false;
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
        this.selectedShoe = new Shoes();
      }
    });
    this.logger.log('init run dialog');
    this.logger.log('isEdit=' + this.isEdit);
  }

  createRun(event) {
    this.logger.log('edit or create run ' + JSON.stringify(this.run));
    if (this.selectedShoe.id) {
      this.run.shoes = this.selectedShoe;
    } else {
      this.run.shoes = null;
    }
    if (this.run.runDuration && this.run.runDuration.time) {
      this.run.runDuration.time = this.correctDurationFormat(this.run.runDuration.time);
    }
    if (this.isEdit) {
      this.runService.update(this.run);
    } else {
      this.runService.create(this.run);
    }
    this.run = new Run();
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
    this.logger.log(this.run);
  }
}
