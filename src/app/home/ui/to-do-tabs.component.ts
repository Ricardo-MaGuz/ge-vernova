import { Component, input } from '@angular/core';
import { ToDoComponent } from './to-do.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDo } from '../models/to-do';

@Component({
  selector: 'app-to-do-tabs',
  standalone: true,
  imports: [MatTabsModule, ToDoComponent],
  template: ` <mat-tab-group>
    <mat-tab label="All" class="">
      <h2 class="mat-title-medium">{{ toDos().length }} Tasks Remaining</h2>
      @for(toDo of toDos(); track toDo.id){<app-to-do
        [id]="toDo.id"
        [status]="toDo.completed"
        [name]="toDo.todo"
      />
      } @empty {
      <p>Please add a task</p>
      }
    </mat-tab>
    <mat-tab label="Active">
      <h2 class="mat-title-medium">{{ activeToDos() }} Active Tasks</h2>
      @for(toDo of toDos(); track toDo.id){ @if(!toDo.completed){<app-to-do
        [id]="toDo.id"
        [status]="toDo.completed"
        [name]="toDo.todo"
      />} }
    </mat-tab>
    <mat-tab label="Completed"
      ><h2 class="mat-title-medium">{{ completedToDos() }} Tasks Completed</h2>
      @for(toDo of toDos(); track toDo.id){ @if(toDo.completed){
      <app-to-do [id]="toDo.id" [status]="toDo.completed" [name]="toDo.todo" />}
      }
    </mat-tab>
  </mat-tab-group>`,
  styles: `.mat-title-medium{margin-top:1em}
`,
})
export class ToDoTabsComponent {
  toDos = input.required<ToDo[]>();
  completedToDos = input.required<number>();
  activeToDos = input.required<number>();
}
