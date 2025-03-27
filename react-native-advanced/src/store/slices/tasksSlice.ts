import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState, TaskFormData, TaskStatus, OfflineAction } from '../../types';
import { taskApi } from '../../services/api';
import { RootState } from '..';
import { generateUUID } from '../../utils/uuid';

// Initial state
const initialState: TaskState = {
  tasks: {},
  loading: false,
  error: null,
  filters: {},
  sortBy: 'dueDate',
  offlineQueue: [],
};

// Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskApi.getTasks();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await taskApi.getTask(taskId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: TaskFormData, { rejectWithValue, getState }) => {
    try {
      const response = await taskApi.createTask(taskData);
      return response.data;
    } catch (error: any) {
      // Create an optimistic task with temporary ID if offline
      if (!navigator.onLine) {
        const tempId = generateUUID();
        const now = new Date().toISOString();
        const newTask: Task = {
          id: tempId,
          ...taskData,
          createdAt: now,
          updatedAt: now
        };
        
        // Return the new task to be added optimistically
        return newTask;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, taskData }: { taskId: string, taskData: Partial<TaskFormData> }, { rejectWithValue }) => {
    try {
      const response = await taskApi.updateTask(taskId, taskData);
      return response.data;
    } catch (error: any) {
      // For offline updates, we'll handle it in the rejected case
      if (!navigator.onLine) {
        return { id: taskId, ...taskData, updatedAt: new Date().toISOString() };
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(taskId);
      return taskId;
    } catch (error: any) {
      // For offline deletes, we'll handle it in the rejected case
      if (!navigator.onLine) {
        return taskId;
      }
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskFilters: (state, action: PayloadAction<TaskState['filters']>) => {
      state.filters = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TaskState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    addToOfflineQueue: (state, action: PayloadAction<OfflineAction>) => {
      state.offlineQueue.push(action.payload);
    },
    removeFromOfflineQueue: (state, action: PayloadAction<string>) => {
      state.offlineQueue = state.offlineQueue.filter(action => action.id !== action.payload);
    },
    clearOfflineQueue: (state) => {
      state.offlineQueue = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        // Convert the array to a normalized object with ids as keys
        state.tasks = action.payload.reduce((acc: Record<string, Task>, task: Task) => {
          acc[task.id] = task;
          return acc;
        }, {});
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch single task
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks[action.payload.id] = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks[action.payload.id] = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        state.tasks[updatedTask.id] = {
          ...state.tasks[updatedTask.id],
          ...updatedTask
        };
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        const taskId = action.payload;
        delete state.tasks[taskId];
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (state: RootState, taskId: string) => state.tasks.tasks[taskId];
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectTaskFilters = (state: RootState) => state.tasks.filters;
export const selectTaskSortBy = (state: RootState) => state.tasks.sortBy;
export const selectOfflineQueue = (state: RootState) => state.tasks.offlineQueue;

export const selectFilteredTasks = (state: RootState) => {
  const tasks = Object.values(state.tasks.tasks);
  const { status, categoryId, priority } = state.tasks.filters;
  const sortBy = state.tasks.sortBy;
  
  // Apply filters
  const filteredTasks = tasks.filter(task => {
    if (status && task.status !== status) return false;
    if (categoryId && task.categoryId !== categoryId) return false;
    if (priority && task.priority !== priority) return false;
    return true;
  });
  
  // Apply sorting
  return filteredTasks.sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'priority') {
      const priorityValues = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return priorityValues[a.priority as keyof typeof priorityValues] - 
             priorityValues[b.priority as keyof typeof priorityValues];
    } else { // createdAt
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
};

export const { 
  setTaskFilters, 
  setSortBy, 
  addToOfflineQueue, 
  removeFromOfflineQueue, 
  clearOfflineQueue 
} = tasksSlice.actions;

export default tasksSlice.reducer;