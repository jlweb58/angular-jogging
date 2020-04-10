import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({

  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDividerModule
  ],

  exports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDividerModule
  ],

  providers: [
    MatDialog,
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MaterialModule { }
