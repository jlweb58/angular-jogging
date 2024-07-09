import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {Gear} from '../../core/models/gear.model';
import {GearService} from '../../core/services/gear.service';


@Component({
  selector: 'app-gear-dialog',
  templateUrl: './gear-dialog.component.html',
  styleUrls: ['./gear-dialog.component.css']
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
