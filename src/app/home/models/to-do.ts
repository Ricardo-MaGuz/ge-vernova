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
export type AddToDo = Omit<ToDo, 'id' | 'userId' | 'completed'>;
export type EditToDo = { id: ToDo['id']; data: AddToDo };
export type ToDoId = ToDo['id'];
