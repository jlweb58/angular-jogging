import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng';
import {DialogModule} from 'primeng/dialog';

@NgModule({

  imports: [
    MenubarModule,
    TableModule,
    DialogModule,
  ],

  exports: [
    MenubarModule,
    TableModule,
    DialogModule,
  ],
})
export class PrimengModule { }
