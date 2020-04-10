import { Component, OnInit } from '@angular/core';
import {ShoesService} from '../shoes.service';
import {Shoes} from '../models/shoes.model';
import {LoggerService} from '../logger/logger.service';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoes-list.component.html',
  styleUrls: ['./shoes-list.component.css']
})
export class ShoesListComponent implements OnInit {

  shoes: Shoes[];
  preferredShoes: Shoes;

  columnsToDisplay = ['preferred', 'name', 'mileage', 'retire'];

  constructor(private shoesService: ShoesService, private logger: LoggerService) {
  }

  ngOnInit(): void {
    this.shoesService.loadAll();
    this.shoesService.shoes.subscribe(results => {
      if (!results) {
        return;
      }
      this.shoes = results.filter(shoe => shoe.active);
      this.preferredShoes = results.find(shoe => shoe.preferred === true);
      this.logger.log('Initialized Shoes List');
    });
  }

  updateShoes(shoes: Shoes) {
    shoes.preferred = (shoes === this.preferredShoes);
    this.shoesService.update(shoes);
  }

  setPreferredShoes(event) {
    this.logger.log('Preferred Shoes: ' + event.value.name);
    this.preferredShoes = event.value;
    this.shoes.forEach(shoes => this.updateShoes(shoes));
  }

  retireShoes(shoes) {
    this.logger.log('Retiring shoes: ' + shoes.name);
    shoes.active = false;
    this.shoesService.update(shoes);
  }
}
