import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-feedback-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
        <button mat-button mat-dialog-close>OK</button>
    </div>
      `
})
  export class FeedbackDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string; message: string}) {
    }
}
