import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {RunTableComponent} from './run-table/run-table.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    RunTableComponent,
  ],
  exports: [
    RunTableComponent,
  ],
})
export class RunModule {}
