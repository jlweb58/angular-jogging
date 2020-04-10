import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../logger/logger.service';
import {Shoes} from '../models/shoes.model';


@Component({
  selector: 'app-shoes-dialog',
  templateUrl: './shoes-dialog.component.html',
  styleUrls: ['./shoes-dialog.component.css']
})
export class ShoesDialogComponent implements OnInit {

  shoes: Shoes[];

  constructor() { }

  ngOnInit(): void {
  }

}
