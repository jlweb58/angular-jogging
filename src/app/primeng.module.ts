import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';

@NgModule({

  imports: [
    MenubarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CardModule,
  ],

  exports: [
    MenubarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CardModule,
  ],
})
export class PrimengModule { }
