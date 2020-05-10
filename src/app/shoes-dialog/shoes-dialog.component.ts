import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../services/logger.service';
import {Shoes} from '../core/models/shoes.model';
import {ShoesService} from '../services/shoes.service';


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
