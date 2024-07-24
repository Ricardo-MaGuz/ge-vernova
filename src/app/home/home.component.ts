import { Component, inject } from '@angular/core';
import { ToDoFormComponent } from './ui/to-do-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule, ToDoFormComponent],
  template: `
    <main class="wrapper">
      <h1>ToDoMatic</h1>
      @if (false){
      <mat-progress-spinner mode="indeterminate" diameter="50" />
      } @else {
      <p>What needs to be done?</p>
      <app-to-do-form [formGroup]="toDoForm" />
      }
    </main>
  `,
  styles: `
  .wrapper{
    position:relative;
    margin:0 auto;
    max-width:600px;
    padding:1em 1em 2em 1em;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    min-height:700px;
    h1, p{
      text-align:center;
      width:100%;
    }
    mat-progress-spinner {
        margin: 2rem auto;
      }
  }`,
})
export default class HomeComponent {
  fb = inject(FormBuilder);
  toDoForm = this.fb.nonNullable.group({
    todo: ['', [Validators.required, Validators.minLength(3)]],
    completed: [false],
  });
}
