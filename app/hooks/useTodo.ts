import { useAppSelector } from '@/services/storage/redux/hooks';
import { Todo, DeletedTodo, ExtendedTodoContextType, TodoContextType } from '@/types/todo';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function useTodos(): ExtendedTodoContextType {
  const { fetchTodosIfNeeded, updateTodoItem, deleteTodoItem, restoreTodoItem } = useContext(
    TodoContext as React.Context<TodoContextType>,
  );
  const { items, deletedItems, loading, error, initialized, updateLoading, updateError } =
    useAppSelector(state => state.todos);

  return {
    todos: items as Todo[],
    deletedTodos: deletedItems as DeletedTodo[],
    isLoading: loading,
    error,
    initialized,
    updateLoading,
    updateError,
    fetchTodosIfNeeded,
    updateTodoItem,
    deleteTodoItem,
    restoreTodoItem,
  };
}
