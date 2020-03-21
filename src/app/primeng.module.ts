import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng';

@NgModule({

  imports: [
    MenubarModule,
    TableModule,
  ],

  exports: [
    MenubarModule,
    TableModule,
  ],
})
export class PrimengModule { }
