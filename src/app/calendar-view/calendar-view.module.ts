import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CalendarViewComponent} from './calendar-view.component';
import {CalenderViewDayComponent} from './calender-view-day/calender-view-day.component';

@NgModule({
  declarations: [
    CalendarViewComponent,
    CalenderViewDayComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    CalendarViewComponent,
  ]
})
export class CalendarViewModule { }
