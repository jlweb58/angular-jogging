import {Component, OnInit} from '@angular/core';
import {GearService} from '../../core/services/gear.service';
import {Gear} from '../../core/models/gear.model';
import {LoggerService} from '../../core/services/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {GearDialogComponent} from '../gear-dialog/gear-dialog.component';
import {GearType} from '../../core/models/gear-type.model';
import {ConfirmationDialog} from '../../shared/components/confirm-dialog.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DecimalPipe, NgClass, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-gear-list',
  templateUrl: './gear-list.component.html',
  styleUrls: ['./gear-list.component.css'],
  imports: [
    MatRadioGroup,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatRadioButton,
    NgClass,
    NgIf,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatDivider,
    MatButton,
    DecimalPipe
  ]
})
export class GearListComponent implements OnInit {

  allShoes: Gear[];
  allBikes: Gear[];
  preferredBike: Gear;
  preferredShoes: Gear;
  columnsToDisplay = ['preferred', 'name', 'gearType', 'mileage', 'retire'];

  constructor(private gearService: GearService,
              private logger: LoggerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.gearService.loadAll();
    this.gearService.gear.subscribe(results => {
      if (!results) {
        return;
      }
      this.allShoes = results.filter(
        g => g.gearType === GearType.Shoes).sort(
        (a, b) => {
          if (b.active !== a.active) {
            return b.active ? 1 : -1;
          } else {
            return b.mileage > a.mileage ? 1 : -1;
          }
        }
      );
      this.allBikes = results.filter(
        g => g.gearType === GearType.Bike).sort(
        (a, b) => {
          if (b.active !== a.active) {
            return b.active ? 1 : -1;
          } else {
            return b.mileage > a.mileage ? 1 : -1;
          }
        }
      );
      this.preferredBike = results.find(gear => gear.preferred === true && gear.gearType === GearType.Bike);
      this.preferredShoes = results.find(gear => gear.preferred === true && gear.gearType === GearType.Shoes);
    });
  }

  updateGear(gear: Gear) {
    gear.preferred = (gear === this.preferredBike || gear === this.preferredShoes);
    this.gearService.update(gear);
  }

  createGear() {
    const dialogRef = this.dialog.open(GearDialogComponent, {
      width: '250px'
    });
  }

  setPreferredGear(event) {
    let eventGearType = event.value.gearType;
    switch (eventGearType) {
      case GearType.Bike:
        this.preferredBike = event.value;
        break;
      case GearType.Shoes:
        this.preferredShoes = event.value;
        break;
    }
    event.value.active = true;
    this.allShoes.forEach(gear => this.updateGear(gear));
  }

  activateGear(gear: Gear) {
    this.toggleGearState(gear, 'Do you really want to activate this gear?', true);
  }

  private toggleGearState(gear: Gear, message: string, active: boolean) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '200px',
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        gear.active = active;
        this.gearService.update(gear);
      }
    });
  }

  retireGear(gear: Gear) {
   this.toggleGearState(gear, 'Do you really want to retire this gear?', false);
  }

  protected readonly GearType = GearType;
}
