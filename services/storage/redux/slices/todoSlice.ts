import { Todo } from '@/services/types/todo';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '@/services/constants/todo';
import {
  fetchTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '@/services/api/apiConfig';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchTodosAPI();
    if (!data) {
      throw new Error('Failed to fetch todos');
    }
    return data;
  } catch (error) {
    console.log({ error });
    return rejectWithValue((error as Error).message);
  }
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo: Partial<Todo> & { id: number }, { rejectWithValue }) => {
    try {
      const data = await updateTodoAPI(todo as Todo);
      if (!data) {
        throw new Error('Failed to update todo');
      }
      return data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number, { rejectWithValue }) => {
    try {
      const result = await deleteTodoAPI(todoId);
      if (!result) {
        throw new Error('Failed to delete todo from server');
      }
      return todoId; // Return the ID of the deleted todo
    } catch (error) {
      console.log({ error });
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: Omit<Todo, 'id'>, { rejectWithValue }) => {
    try {
      const data = await createTodoAPI(todo);
      if (!data) {
        throw new Error('Failed to create todo');
      }
      return data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue((error as Error).message);
    }
  },
);

// // Helper function to clean up deleted todos older than 24 hours
// const cleanupDeletedTodos = (deletedItems: DeletedTodo[]): DeletedTodo[] => {
//   // Return empty array if deletedItems is undefined or null
//   if (!deletedItems) return [];

//   const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago in milliseconds
//   return deletedItems.filter(item => item.deletedAt > oneDayAgo);
// };

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setInitialized(state) {
      state.initialized = true;
    },
    deleteTodoLocal(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const todoToDelete = state.items.find(todo => todo.id === todoId);

      if (todoToDelete) {
        state.deletedItems.push({
          ...todoToDelete,
          deletedAt: Date.now(),
        });

        state.items = state.items.filter(todo => todo.id !== todoId);

        // // Clean up old deleted todos
        // state.deletedItems = cleanupDeletedTodos(state.deletedItems);
      }
    },
    restoreTodo(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const todoToRestore = state.deletedItems.find(todo => todo.id === todoId);

      if (todoToRestore) {
        const { ...todoWithoutDeletedAt } = todoToRestore;
        state.items.push(todoWithoutDeletedAt);

        state.deletedItems = state.deletedItems.filter(todo => todo.id !== todoId);
      }
    },
    // cleanupOldDeletedTodos(state) {
    //   state.deletedItems = cleanupDeletedTodos(state.deletedItems);
    // },
  },
  extraReducers: builder => {
    builder
      // Fetch todos cases
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.initialized = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch todos';
      })

      // Update todo cases
      .addCase(updateTodo.pending, state => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.updateLoading = false;
        // Replace the old todo with the updated one
        const updatedTodo = action.payload;
        const index = state.items.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.items[index] = updatedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = (action.payload as string) || 'Failed to update todo';
      })

      // Delete todo server cases
      .addCase(deleteTodo.pending, state => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.deleteLoading = false;
        // Remove the todo from items
        state.items = state.items.filter(todo => todo.id !== action.payload);
        // Also remove from deletedItems if it exists there
        state.deletedItems = state.deletedItems.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = (action.payload as string) || 'Failed to delete todo from server';
      })

      // Create todo cases
      .addCase(createTodo.pending, state => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.createLoading = false;
        // Add the new todo to the items array
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = (action.payload as string) || 'Failed to create todo';
      });
  },
});

export const { setInitialized, deleteTodoLocal, restoreTodo } = todoSlice.actions;

export default todoSlice.reducer;
