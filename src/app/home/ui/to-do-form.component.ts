import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-to-do-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `<form [formGroup]="formGroup()">
    <mat-form-field class="input accent-button">
      <input type="text" matInput formControlName="todo" />
      <button
        matSuffix
        mat-icon-button
        [disabled]="!formGroup().valid"
        aria-label="Add to Do"
        type="submit"
      >
        <mat-icon>add</mat-icon>
      </button>
      @if (formGroup().controls['todo'].hasError('minLength') ||
      !formGroup().controls['todo'].hasError('required')) {
      <mat-error>Please ener more than <strong>3 characters</strong></mat-error>
      } @if (formGroup().controls['todo'].hasError('required')) {
      <mat-error>A to do is <strong>required</strong></mat-error>
      }
    </mat-form-field>
  </form>`,
  styles: `.input{width:100%; margin-bottom:.3em}`,
})
export class ToDoFormComponent {
  formGroup = input.required<FormGroup>();
}
