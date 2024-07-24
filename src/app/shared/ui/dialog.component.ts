import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
export interface DialogData {
  dialogTitle: string;
  dialogDescription: string;
  cancelButton: string;
  confirmButton: string;
  template: string;
}
@Component({
  selector: 'app-dialog',
  template: `<h2 mat-dialog-title class="mat-title-medium">
      {{ data.dialogTitle }}
    </h2>
    <mat-dialog-content>
      @if (!data.template) {
      <p>{{ data.dialogDescription }}</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">{{ data.cancelButton }}</button>
      <button mat-button [mat-dialog-close]="confirm()" cdkFocusInitial>
        {{ data.confirmButton }}
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle,
  ],
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  close(): void {
    this.dialogRef.close();
  }
  confirm() {
    return true;
  }
}
