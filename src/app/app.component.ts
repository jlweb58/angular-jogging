import {Component, OnInit} from '@angular/core';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {Run} from './models/run.model';
import {LoggerService} from './logger/logger.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/primeflex/primeflex.css'],

})
export class AppComponent implements OnInit {

  constructor(private logger: LoggerService, private dialog: MatDialog) {
  }

  ngOnInit() {

  }

   newRun() {
    const dialogRef = this.dialog.open(RunDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
       this.logger.log('The dialog was closed');
     });
  }


}
