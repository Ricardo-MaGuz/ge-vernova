import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToDo, ToDoListResponse } from '../models/to-do';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
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
}
