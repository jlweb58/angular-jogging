import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent,
  ],

})
export class SharedModule {

}
