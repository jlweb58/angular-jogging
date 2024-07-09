import {NgModule} from '@angular/core';
import {GearListComponent} from './gear-list/gear-list.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GearDialogComponent} from './gear-dialog/gear-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    GearListComponent,
    GearDialogComponent
  ],
  exports: [
    GearListComponent,
    GearDialogComponent,
  ]
})
export class GearModule {}
