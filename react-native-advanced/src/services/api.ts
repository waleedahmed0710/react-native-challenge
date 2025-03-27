import axios from 'axios';
import { ApiResponse, Category, Task, TaskFormData } from '../types';
import { mockTasks, mockCategories } from './mockData';
import { generateUUID } from '../utils/uuid';
import { USE_JSON_SERVER, JSON_SERVER_URL } from '../config/api.config';

// In-memory data store for mock API
let tasks = [...mockTasks];
let categories = [...mockCategories];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create axios instance for JSON server
const api = axios.create({
  baseURL: JSON_SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JSON Server implementation
const jsonServerApi = {
  // Task API
  getTasks: async (): Promise<ApiResponse<Task[]>> => {
    try {
      const response = await api.get('/tasks');
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      throw {
        message: error.message || 'Failed to fetch tasks',
        status: error.response?.status || 500
      };
    }
  },

  getTask: async (id: string): Promise<ApiResponse<Task>> => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error fetching task:', error);
      throw {
        message: error.message || 'Failed to fetch task',
        status: error.response?.status || 500
      };
    }
  },

  createTask: async (task: TaskFormData): Promise<ApiResponse<Task>> => {
    try {
      const timestamp = new Date().toISOString();
      const newTask = {
        id: generateUUID(),
        ...task,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const response = await api.post('/tasks', newTask);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error creating task:', error);
      throw {
        message: error.message || 'Failed to create task',
        status: error.response?.status || 500
      };
    }
  },

  updateTask: async (id: string, taskData: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
    try {
      const updatedTask = {
        ...taskData,
        updatedAt: new Date().toISOString(),
      };
      const response = await api.patch(`/tasks/${id}`, updatedTask);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error updating task:', error);
      throw {
        message: error.message || 'Failed to update task',
        status: error.response?.status || 500
      };
    }
  },

  deleteTask: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return { data: undefined, status: response.status };
    } catch (error: any) {
      console.error('Error deleting task:', error);
      throw {
        message: error.message || 'Failed to delete task',
        status: error.response?.status || 500
      };
    }
  },

  // Category API
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const response = await api.get('/categories');
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw {
        message: error.message || 'Failed to fetch categories',
        status: error.response?.status || 500
      };
    }
  },

  getCategory: async (id: string): Promise<ApiResponse<Category>> => {
    try {
      const response = await api.get(`/categories/${id}`);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error fetching category:', error);
      throw {
        message: error.message || 'Failed to fetch category',
        status: error.response?.status || 500
      };
    }
  },

  createCategory: async (categoryData: Omit<Category, 'id'>): Promise<ApiResponse<Category>> => {
    try {
      const newCategory = {
        id: generateUUID(),
        ...categoryData
      };
      const response = await api.post('/categories', newCategory);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error creating category:', error);
      throw {
        message: error.message || 'Failed to create category',
        status: error.response?.status || 500
      };
    }
  },

  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
    try {
      const response = await api.patch(`/categories/${id}`, categoryData);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      console.error('Error updating category:', error);
      throw {
        message: error.message || 'Failed to update category',
        status: error.response?.status || 500
      };
    }
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return { data: undefined, status: response.status };
    } catch (error: any) {
      console.error('Error deleting category:', error);
      throw {
        message: error.message || 'Failed to delete category',
        status: error.response?.status || 500
      };
    }
  }
};

// In-memory mock API implementation
const inMemoryApi = {
  getTasks: async (): Promise<ApiResponse<Task[]>> => {
    // Simulate network delay
    await delay(500);
    return { data: tasks, status: 200 };
  },

  getTask: async (id: string): Promise<ApiResponse<Task>> => {
    await delay(300);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw {
        message: 'Task not found',
        status: 404
      };
    }
    return { data: task, status: 200 };
  },

  createTask: async (task: TaskFormData): Promise<ApiResponse<Task>> => {
    try {
      console.log('Creating new task with data:', task);
      await delay(500);
      const timestamp = new Date().toISOString();
      const newId = generateUUID();
      console.log('Generated ID for new task:', newId);
      
      // Generate a unique ID for the new task
      const newTask: Task = {
        id: newId,
        ...task,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      
      // Add the new task to our in-memory store
      tasks = [...tasks, newTask];
      console.log('Task created successfully, current tasks count:', tasks.length);
      
      return { data: newTask, status: 201 };
    } catch (error) {
      console.error('Error creating task:', error);
      throw {
        message: 'Failed to create task',
        status: 500
      };
    }
  },

  updateTask: async (id: string, taskData: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
    await delay(400);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw {
        message: 'Task not found',
        status: 404
      };
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    tasks = [
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1)
    ];
    
    return { data: updatedTask, status: 200 };
  },

  deleteTask: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw {
        message: 'Task not found',
        status: 404
      };
    }
    
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1)
    ];
    
    return { data: undefined, status: 204 };
  },
};

// Category API implementation
const categoryApiImpl = {
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    await delay(300);
    return { data: categories, status: 200 };
  },

  getCategory: async (id: string): Promise<ApiResponse<Category>> => {
    await delay(200);
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw {
        message: 'Category not found',
        status: 404
      };
    }
    return { data: category, status: 200 };
  },

  createCategory: async (categoryData: Omit<Category, 'id'>): Promise<ApiResponse<Category>> => {
    await delay(400);
    const newCategory: Category = {
      id: generateUUID(),
      ...categoryData
    };
    categories = [...categories, newCategory];
    return { data: newCategory, status: 201 };
  },

  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
    await delay(300);
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      throw {
        message: 'Category not found',
        status: 404
      };
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...categoryData
    };
    
    categories = [
      ...categories.slice(0, categoryIndex),
      updatedCategory,
      ...categories.slice(categoryIndex + 1)
    ];
    
    return { data: updatedCategory, status: 200 };
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      throw {
        message: 'Category not found',
        status: 404
      };
    }
    
    categories = [
      ...categories.slice(0, categoryIndex),
      ...categories.slice(categoryIndex + 1)
    ];
    
    return { data: undefined, status: 204 };
  },
};

// Export the appropriate API implementation based on configuration
export const taskApi = USE_JSON_SERVER ? jsonServerApi : inMemoryApi;
export const categoryApi = USE_JSON_SERVER ? jsonServerApi : categoryApiImpl;
