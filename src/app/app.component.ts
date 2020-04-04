import {Component, OnInit} from '@angular/core';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {Run} from './models/run.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/primeflex/primeflex.css'],

})
export class AppComponent implements OnInit {
  title = 'Jogging';

  constructor() {
  }

  ngOnInit() {

  }


}
