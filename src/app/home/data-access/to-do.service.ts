import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddToDo, ToDo, ToDoId, ToDoListResponse } from '../models/to-do';

import { EMPTY, Subject } from 'rxjs';
export interface ToDosState {
  toDos: ToDo[];
  loading: boolean;
  completedToDos: number;
  activeToDos: number;
}
@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private http = inject(HttpClient);
  private state = signal<ToDosState>({
    toDos: [],
    loading: true,
    completedToDos: 0,
    activeToDos: 0,
  });

  toDos = computed(() => this.state().toDos);
  loading = computed(() => this.state().loading);
  completedToDos = computed(() => this.state().completedToDos);
  activetoDos = computed(() => this.state().activeToDos);

  private error$ = new Subject<string | null>();
  private loadedToDos$ = this.fetchToDos();
  add$ = new Subject<AddToDo>();
  toggleComplete$ = new Subject<ToDoId>();

  constructor() {
    //reducers
    this.loadedToDos$.pipe(takeUntilDestroyed()).subscribe((res) =>
      this.state.update((state) => ({
        ...state,
        toDos: [...state.toDos, ...res.todos],
        completedToDos: res.todos.filter((toDo) => toDo.completed).length,
        activeToDos: res.todos.filter((toDo) => !toDo.completed).length,
        loading: false,
      }))
    );

    this.add$.pipe(takeUntilDestroyed()).subscribe((toDo) => {
      this.state.update((state) => {
        const newToDos = [this.addToDoId(toDo), ...state.toDos];
        const newState = { ...state, toDos: newToDos };
        return this.updateCounts(newState);
      });
    });

    this.toggleComplete$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.state.update((state) => {
        const newToDos = state.toDos.map((toDo) =>
          toDo.id === id ? { ...toDo, completed: !toDo.completed } : toDo
        );
        const newState = { ...state, toDos: newToDos };
        return this.updateCounts(newState);
      });
    });
  }

  private handleError(err: HttpErrorResponse) {
    if (err) {
      this.error$.next(`Failed to load To Dos`);
      return;
    }
  }

  private fetchToDos() {
    return this.http.get<ToDoListResponse>(`https://dummyjson.com/todos`).pipe(
      catchError((err) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  private addToDoId(toDo: AddToDo) {
    return {
      ...toDo,
      id: this.generateId(),
      userId: this.generateUserId(),
      completed: false,
    };
  }

  private generateId() {
    return this.toDos().length + 1;
  }

  private generateUserId() {
    return Math.floor(Math.random() * 10000) + 1;
  }

  updateCounts(state: ToDosState) {
    const completedToDos = state.toDos.filter((toDo) => toDo.completed).length;
    const activeToDos = state.toDos.filter((toDo) => !toDo.completed).length;

    return {
      ...state,
      completedToDos,
      activeToDos,
    };
  }
}
