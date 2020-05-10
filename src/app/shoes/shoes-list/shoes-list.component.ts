import {Component, OnInit} from '@angular/core';
import {ShoesService} from '../../core/services/shoes.service';
import {Shoes} from '../../core/models/shoes.model';
import {LoggerService} from '../../core/services/logger.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {ShoesDialogComponent} from '../../shoes-dialog/shoes-dialog.component';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoes-list.component.html',
  styleUrls: ['./shoes-list.component.css']
})
export class ShoesListComponent implements OnInit {

  shoes: Shoes[];
  preferredShoes: Shoes;
  columnsToDisplay = ['preferred', 'name', 'mileage', 'retire'];

  constructor(private shoesService: ShoesService,
              private logger: LoggerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.shoesService.loadAll();
    this.shoesService.shoes.subscribe(results => {
      if (!results) {
        return;
      }
      this.shoes = results.filter(shoe => shoe.active);
      this.preferredShoes = results.find(shoe => shoe.preferred === true);
    });
  }

  updateShoes(shoes: Shoes) {
    shoes.preferred = (shoes === this.preferredShoes);
    this.shoesService.update(shoes);
  }

  createShoes() {
    const dialogRef = this.dialog.open(ShoesDialogComponent, {
      width: '250px'
    });
  }

  setPreferredShoes(event) {
    this.logger.log('Preferred Shoes: ' + event.value.name);
    this.preferredShoes = event.value;
    this.shoes.forEach(shoes => this.updateShoes(shoes));
  }

  retireShoes(shoes: Shoes) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: 'Do you really want to retire these shoes?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logger.log('Retiring shoes: ' + shoes.name);
        shoes.active = false;
        this.shoesService.update(shoes);
      }
    });
  }
}
