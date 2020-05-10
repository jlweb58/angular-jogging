import {NgModule} from '@angular/core';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ShoesDialogComponent} from './shoes-dialog/shoes-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    ShoesListComponent,
    ShoesDialogComponent
  ],
  exports: [
    ShoesListComponent,
    ShoesDialogComponent,
  ]
})
export class ShoesModule {}
