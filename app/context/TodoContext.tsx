import { useAppDispatch, useAppSelector } from '@/services/storage/redux/hooks';
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  restoreTodo,
} from '@/services/storage/redux/slices/todoSlice';
import React, { createContext, useEffect, useState } from 'react';
import { TodoContextType, TodoProviderProps } from '@/types/todo';

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export default function TodoProvider({ children }: TodoProviderProps) {
  const dispatch = useAppDispatch();
  const { loading, error, initialized, updateLoading, updateError } = useAppSelector(
    state => state.todos,
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchTodosIfNeeded = async () => {
    try {
      if (!initialized) {
        await dispatch(fetchTodos()).unwrap();
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const updateTodoItem = async (id: number, changes: { title?: string; completed?: boolean }) => {
    await dispatch(updateTodo({ id, ...changes }));
  };

  const deleteTodoItem = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const restoreTodoItem = (id: number) => {
    dispatch(restoreTodo(id));
  };

  useEffect(() => {
    let mounted = true;

    const initializeTodos = async () => {
      try {
        if (isInitialLoad && mounted) {
          await fetchTodosIfNeeded();
          if (mounted) {
            setIsInitialLoad(false);
          }
        }
      } catch (error) {
        console.error('Error initializing todos:', error);
      }
    };

    initializeTodos();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoad]);

  const value = {
    isLoading: loading,
    error,
    updateLoading,
    updateError,
    fetchTodosIfNeeded,
    updateTodoItem,
    deleteTodoItem,
    restoreTodoItem,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
