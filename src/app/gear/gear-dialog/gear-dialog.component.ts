import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {Gear} from '../../core/models/gear.model';
import {GearService} from '../../core/services/gear.service';
import {FormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-gear-dialog',
  templateUrl: './gear-dialog.component.html',
  styleUrls: ['./gear-dialog.component.css'],
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class GearDialogComponent implements OnInit {

  gear: Gear;

  constructor(private logger: LoggerService, private gearService: GearService) {
    this.gear = new Gear();
  }

  ngOnInit(): void {
  }

  createGear(gear) {
    this.gearService.create(gear);
  }

}
