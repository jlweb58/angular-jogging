import {Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {Gear} from '../../core/models/gear.model';
import {GearService} from '../../core/services/gear.service';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {GearType, GearTypeType} from '../../core/models/gear-type.model';

export interface GearDialogData {
  gear?: Gear;
}

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
    MatDialogClose,
    MatSelect,
    MatOption
  ]
})
export class GearDialogComponent implements OnInit {

  gear: Gear;
  gearTypes: GearTypeType = GearType;
  editMode: boolean;

  constructor(private logger: LoggerService,
              private gearService: GearService,
              @Inject(MAT_DIALOG_DATA) public data: GearDialogData) {
    this.editMode = !!data?.gear;
    this.gear = data?.gear ? Object.assign(new Gear(), data.gear) : new Gear();
  }

  ngOnInit(): void {
  }

  saveGear(gear: Gear) {
    if (this.editMode) {
      this.gearService.update(gear);
    } else {
      this.gearService.create(gear);
    }
  }

}
