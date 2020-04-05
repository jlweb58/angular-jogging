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

  @Input() run: Run;
  @Output() displayChange = new EventEmitter();
  isEdit: boolean;
  shoes: Shoes[];
  selectedShoe: Shoes;

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
    });
    this.logger.log('init run dialog');
    this.logger.log('isEdit=' + this.isEdit);
  }

  createRun(event) {
    this.logger.log('create run ' + JSON.stringify(this.run));
    this.run.shoes = this.selectedShoe;
    this.runService.create(this.run);
    this.run = new Run();
  }

  onClose() {
    this.displayChange.emit(false);
    this.logger.log(this.run);
  }
}
