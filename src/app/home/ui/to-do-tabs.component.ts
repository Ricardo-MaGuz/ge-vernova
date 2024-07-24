import { Component } from '@angular/core';
import { ToDoComponent } from './to-do.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-to-do-tabs',
  standalone: true,
  imports: [MatTabsModule, ToDoComponent],
  template: ` <mat-tab-group>
    <mat-tab label="All" class="">
      <h2 class="mat-title-medium">Tasks Remaining</h2>
      <app-to-do [id]="1" [status]="true" [name]="'name'" />
    </mat-tab>
    <mat-tab label="Active">
      <h2 class="mat-title-medium">Active Tasks</h2>
      <app-to-do [id]="1" [status]="true" [name]="'name'" />
    </mat-tab>
    <mat-tab label="Completed"
      ><h2 class="mat-title-medium">Tasks Completed</h2>
      <app-to-do [id]="1" [status]="true" [name]="'name'" />
    </mat-tab>
  </mat-tab-group>`,
  styles: `.mat-title-medium{margin-top:1em}
`,
})
export class ToDoTabsComponent {}
