import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../logger/logger.service';
import {Shoes} from '../models/shoes.model';
import {Run} from '../models/run.model';
import {ShoesService} from '../shoes.service';


@Component({
  selector: 'app-shoes-dialog',
  templateUrl: './shoes-dialog.component.html',
  styleUrls: ['./shoes-dialog.component.css']
})
export class ShoesDialogComponent implements OnInit {

  shoes: Shoes;

  constructor(private logger: LoggerService, private shoesService: ShoesService) {
    this.shoes = new Shoes();
  }

  ngOnInit(): void {
  }

  createShoes(shoes) {
    this.shoesService.create(shoes);
  }

}
