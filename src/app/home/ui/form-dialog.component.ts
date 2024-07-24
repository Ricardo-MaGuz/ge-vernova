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
import { ToDoFormComponent } from './to-do-form.component';
import { ToDoService } from '../data-access/to-do.service';
import { FormBuilder, Validators } from '@angular/forms';
export interface DialogData {
  id: number;
  toDo: string;
  dialogTitle: string;
  dialogDescription: string;
  cancelButton: string;
  confirmButton: string;
}
@Component({
  selector: 'app-dialog',
  template: `<h2 mat-dialog-title class="mat-title-medium">
      {{ data.dialogTitle }}
    </h2>
    <mat-dialog-content>
      <p>{{ data.dialogDescription }}</p>
      <app-to-do-form
        [formType]="formType"
        [formGroup]="toDoForm"
        [placeholder]="'Edit To Do'"
        [toDoName]="data.toDo"
        (submitForm)="this.toDoService.edit$.next({
        id: this.data.id,
        data: this.toDoForm.getRawValue(),
      }); this.close()"
      />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">No Thanks</button>
      <button mat-button (click)="accept()" cdkFocusInitial>Edit To Do</button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle,
    ToDoFormComponent,
  ],
})
export class FormDialogComponent {
  toDoService = inject(ToDoService);
  fb = inject(FormBuilder);
  formType = 'edit';
  toDoForm = this.fb.nonNullable.group({
    todo: ['', [Validators.required, Validators.minLength(3)]],
  });
  readonly dialogRef = inject(MatDialogRef<FormDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  close(): void {
    this.dialogRef.close();
  }
  accept() {
    if (!this.toDoForm.valid) {
      return;
    } else {
      this.toDoService.edit$.next({
        id: this.data.id,
        data: this.toDoForm.getRawValue(),
      });
      this.dialogRef.close();
    }
  }
}
