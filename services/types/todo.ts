export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface DeletedTodo extends Todo {
  deletedAt: number;
}

export interface TodoState {
  items: Todo[];
  deletedItems: DeletedTodo[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  updateLoading: boolean;
  updateError: string | null;
  deleteLoading: boolean;
  deleteError: string | null;
  createLoading: boolean;
  createError: string | null;
  operation: {
    type: 'fetch' | 'update' | 'delete' | 'create' | null;
    loading: boolean;
    error: string | null;
  };
}
