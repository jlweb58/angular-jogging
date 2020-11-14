import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../material.module';
import {MonthDatePickerComponent} from './month-date-picker/month-date-picker.component';
import {YearDatePickerComponent} from './year-date-picker/year-date-picker.component';
import {FormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import {MapViewComponent} from './map-view/map-view.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    MonthDatePickerComponent,
    YearDatePickerComponent,
    MapViewComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    MonthDatePickerComponent,
    YearDatePickerComponent,
    MapViewComponent,
  ],

})
export class SharedModule {

}
