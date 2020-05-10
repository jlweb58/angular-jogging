import {NgModule} from '@angular/core';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    ShoesListComponent,
  ],
  exports: [
    ShoesListComponent,
  ]
})
export class ShoesModule {}
