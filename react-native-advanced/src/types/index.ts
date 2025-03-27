
export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done'
}
  
export enum TaskPriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export enum TaskSortOption {
    DUE_DATE = 'dueDate',
    CREATED_AT = 'createdAt',
    PRIORITY = 'priority'
}
  
export interface Task {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string; 
    createdAt: string; 
    updatedAt: string; 
}
  
  
export interface Category {
    id: string;
    name: string;
    color: string;
}
  

export type RootStackParamList = {
    Home: undefined;
    TaskDetail: { taskId: string };
    TaskForm: { taskId?: string };
    Settings: undefined;
};
  
  
export interface TaskState {
    tasks: Record<string, Task>;
    loading: boolean;
    error: string | null;
    filters: {
      status?: TaskStatus;
      categoryId?: string;
      priority?: TaskPriority;
    };
    sortBy: 'dueDate' | 'createdAt' | 'priority';
    offlineQueue: OfflineAction[];
}
  
export interface CategoryState {
    categories: Record<string, Category>;
    loading: boolean;
    error: string | null;
}
  
export interface SettingsState {
    theme: 'light' | 'dark';
    defaultView: 'all' | 'todo' | 'inProgress' | 'done';
}
  
export interface RootState {
    tasks: TaskState;
    categories: CategoryState;
    settings: SettingsState;
}
  
export interface OfflineAction {
    id: string;
    type: string;
    payload: any;
    meta?: any;
    timestamp: number;
}
  
 
export interface ApiResponse<T> {
    data: T;
    status: number;
}
  
export interface ApiError {
    message: string;
    status: number;
}
  

export interface TaskFormData {
    title: string;
    description?: string;
    categoryId: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
}