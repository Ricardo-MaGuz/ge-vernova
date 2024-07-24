import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ToDoFormComponent } from './to-do-form.component';
import { ToDoService } from '../data-access/to-do.service';
import { DialogComponent } from '../../shared/ui/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog.component';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ToDoFormComponent,
    DialogComponent,
  ],
  template: `
    <div class="to-do">
      <mat-checkbox
        [checked]="status()"
        (click)="toggleComplete(id())"
        class="checkbox"
      >
        {{ name() }}
      </mat-checkbox>
      <div class="actions">
        <button
          mat-icon-button
          aria-label="Edit to Do"
          (click)="editToDo(id(), name())"
        >
          <mat-icon>edit</mat-icon>
        </button>
        <button
          mat-icon-button
          aria-label="Delete to Do"
          (click)="deleteToDo(id(), name())"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
    <mat-divider />
  `,
  styles: `.to-do{
    display:flex;
    justify-content:space-between;
    align-content: start;
    max-width:100%;
    .checkbox{
        width:80%;
    }
    .actions{width:15%}
  }`,
})
export class ToDoComponent {
  readonly dialog = inject(MatDialog);
  toDoService = inject(ToDoService);
  id = input.required<number>();
  status = input.required<boolean>();
  name = input.required<string>();

  toggleComplete(id: number) {
    this.toDoService.toggleComplete$.next(id);
  }

  deleteToDo(id: number, name: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogTitle: 'Delete To Do',
        id: id,
        dialogDescription: `Are you sure to delete: ${name}?`,
        cancelButton: 'Cancel',
        confirmButton: 'Delete To Do',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.toDoService.delete$.next(id);
      }
    });
  }

  editToDo(id: number, name: string) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        dialogTitle: 'Edit To Do',
        id: id,
        toDo: name,
        dialogDescription: `Are you sure to edit: ${name}?`,
        cancelButton: 'Cancel',
        confirmButton: 'Edit To Do',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
      }
    });
  }
}
