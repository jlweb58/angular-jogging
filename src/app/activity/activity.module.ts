import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {ActivityTableComponent} from './activity-table/activity-table.component';
import {ActivityDialogComponent} from './activity-dialog/activity-dialog.component';
import {ActivityViewComponent} from './activity-view/activity-view.component';
import {SharedModule} from '../shared/shared.module';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        SharedModule,
        MatSortModule,
    ],
  declarations: [
    ActivityTableComponent,
    ActivityDialogComponent,
    ActivityViewComponent,
  ],
  exports: [
    ActivityTableComponent,
    ActivityDialogComponent,
  ],

})
export class ActivityModule {}
