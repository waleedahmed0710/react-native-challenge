import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { fetchTodos, createTodo, updateTodo } from '../storage/redux/slices/todoSlice';
import { fetchTodosAPI, createTodoAPI, updateTodoAPI } from '../api/apiConfig';
import { Todo } from '../types/todo';
import { AppDispatch } from '../storage/redux/store';
import { TodoState } from '../types/todo';

// Mock the API functions
jest.mock('../api/apiConfig', () => ({
  fetchTodosAPI: jest.fn(),
  createTodoAPI: jest.fn(),
  updateTodoAPI: jest.fn(),
}));

describe('todoSlice', () => {
  let store: ReturnType<typeof configureStore<{ todos: TodoState }>>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todoReducer,
      },
    });
    dispatch = store.dispatch;
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('fetchTodos', () => {
    const mockTodos: Todo[] = [
      { id: 1, userId: 1, title: 'Test Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Test Todo 2', completed: true },
    ];

    it('should fetch todos successfully', async () => {
      (fetchTodosAPI as jest.Mock).mockResolvedValue(mockTodos);

      const result = await dispatch(fetchTodos());
      const state = store.getState().todos;

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.items).toEqual(mockTodos);
      expect(result.payload).toEqual(mockTodos);
    });

    it('should handle fetch todos error', async () => {
      const errorMessage = 'Failed to fetch todos';
      (fetchTodosAPI as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const result = await dispatch(fetchTodos());
      const state = store.getState().todos;

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(result.payload).toBe(errorMessage);
    });
  });

  describe('createTodo', () => {
    const newTodo: Omit<Todo, 'id'> = {
      userId: 1,
      title: 'New Todo',
      completed: false,
    };

    const createdTodo: Todo = {
      id: 1,
      ...newTodo,
    };

    it('should create todo successfully', async () => {
      (createTodoAPI as jest.Mock).mockResolvedValue(createdTodo);

      const result = await dispatch(createTodo(newTodo));
      const state = store.getState().todos;

      expect(state.createLoading).toBe(false);
      expect(state.createError).toBe(null);
      expect(state.items).toContainEqual(createdTodo);
      expect(result.payload).toEqual(createdTodo);
    });

    it('should handle create todo error', async () => {
      const errorMessage = 'Failed to create todo';
      (createTodoAPI as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const result = await dispatch(createTodo(newTodo));
      const state = store.getState().todos;

      expect(state.createLoading).toBe(false);
      expect(state.createError).toBe(errorMessage);
      expect(result.payload).toBe(errorMessage);
    });
  });

  describe('updateTodo', () => {
    const updatedTodo: Todo = {
      id: 1,
      userId: 1,
      title: 'Updated Todo',
      completed: true,
    };

    it('should update todo successfully', async () => {
      // First, add a todo to the store
      store.dispatch({
        type: 'todos/createTodo/fulfilled',
        payload: { id: 1, userId: 1, title: 'Original Todo', completed: false },
      });

      (updateTodoAPI as jest.Mock).mockResolvedValue(updatedTodo);

      const result = await dispatch(updateTodo(updatedTodo));
      const state = store.getState().todos;

      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe(null);
      expect(state.items.find(todo => todo.id === updatedTodo.id)).toEqual(updatedTodo);
      expect(result.payload).toEqual(updatedTodo);
    });

    it('should handle update todo error', async () => {
      const errorMessage = 'Failed to update todo';
      (updateTodoAPI as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const result = await dispatch(updateTodo(updatedTodo));
      const state = store.getState().todos;

      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe(errorMessage);
      expect(result.payload).toBe(errorMessage);
    });
  });
});
