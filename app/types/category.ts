import { DeletedTodo, Todo } from '@/services/types/todo';

export interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface TodoCategory {
  todoId: number;
  categoryId: string;
}

export interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categoryName: string;
  onCategoryNameChange: (name: string) => void;
  categoryColor: string;
  onCategoryColorChange: (color: string) => void;
  onSave: () => void;
  editingCategory: Category | null;
  colorOptions: string[];
}

export interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onPress: (category: Category) => void;
}

export interface CategoryTodosModalProps {
  visible: boolean;
  onClose: () => void;
  category: Category | null;
  todos: Array<{ id: number; title: string; completed: boolean }>;
  onToggleTodo: (todoId: number, currentCompleted: boolean) => void;
}

export interface DeletedTodoItemProps {
  todo: DeletedTodo;
  onRestore: (id: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onOptionPress: (todo: Todo) => void;
}
