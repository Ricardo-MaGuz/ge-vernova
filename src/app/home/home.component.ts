import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <main class="wrapper">
      <h1>ToDoMatic</h1>
      @if (false){
      <mat-progress-spinner mode="indeterminate" diameter="50" />
      } @else {
      <p>What needs to be done?</p>
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
export default class HomeComponent {}
