import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'confirmation-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button [mat-dialog-close]="true" color="primary">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmationDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
    }
  ) {}
}
