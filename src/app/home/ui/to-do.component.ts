import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ToDoFormComponent } from './to-do-form.component';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ToDoFormComponent,
  ],
  template: `
    <div class="to-do">
      <mat-checkbox [checked]="status()" class="checkbox">
        {{ name() }}
      </mat-checkbox>
      <div class="actions">
        <button mat-icon-button aria-label="Edit to Do">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button aria-label="Delete to Do">
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
  id = input.required<number>();
  status = input.required<boolean>();
  name = input.required<string>();
}
