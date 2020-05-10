import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {RunTableComponent} from './run-table/run-table.component';
import {RunDialogComponent} from './run-dialog/run-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    RunTableComponent,
    RunDialogComponent,
  ],
  exports: [
    RunTableComponent,
    RunDialogComponent,
  ],
  entryComponents: [
    RunDialogComponent,
  ],

})
export class RunModule {}
