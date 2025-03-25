import { ReactNode } from 'react';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TodoContextType {
  isLoading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
  fetchTodosIfNeeded: () => Promise<void>;
  updateTodoItem: (id: number, changes: { title?: string; completed?: boolean }) => Promise<void>;
  deleteTodoItem: (id: number) => void;
  restoreTodoItem: (id: number) => void;
}

export interface ExtendedTodoContextType extends TodoContextType {
  todos: Todo[];
  deletedTodos: DeletedTodo[];
  initialized: boolean;
}

export interface TodoProviderProps {
  children: ReactNode;
}

export interface DeletedTodo extends Todo {
  deletedAt: number;
}
