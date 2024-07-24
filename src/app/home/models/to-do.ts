export interface ToDoListResponse {
  limit: number;
  skip: number;
  todos: ToDo[];
  total: number;
}

export interface ToDo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
