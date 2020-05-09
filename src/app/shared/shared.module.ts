import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../material.module';
import {MonthDatePickerComponent} from './month-date-picker/month-date-picker.component';
import {YearDatePickerComponent} from './year-date-picker/year-date-picker.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    MonthDatePickerComponent,
    YearDatePickerComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    MonthDatePickerComponent,
    YearDatePickerComponent,
  ],

})
export class SharedModule {

}
