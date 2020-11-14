import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {RunTableComponent} from './run-table/run-table.component';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import { RunViewComponent } from './run-view/run-view.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        SharedModule,
    ],
  declarations: [
    RunTableComponent,
    RunDialogComponent,
    RunViewComponent,
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
