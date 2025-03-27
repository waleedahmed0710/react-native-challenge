import { Task, TaskStatus, TaskPriority, Category } from '../types';

// Generate timestamps
const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

// Mock categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Work',
    color: '#4285F4'
  },
  {
    id: '2',
    name: 'Personal',
    color: '#EA4335'
  },
  {
    id: '3',
    name: 'Health',
    color: '#34A853'
  },
  {
    id: '4',
    name: 'Finance',
    color: '#FBBC05'
  }
];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the draft and send it to the team for review',
    categoryId: '1',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    dueDate: tomorrow.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: '2',
    title: 'Grocery shopping',
    description: 'Buy fruits, vegetables, and other essentials',
    categoryId: '2',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: tomorrow.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString()
  },
  {
    id: '3',
    title: 'Morning jog',
    description: 'Run for 30 minutes in the park',
    categoryId: '3',
    status: TaskStatus.DONE,
    priority: TaskPriority.LOW,
    dueDate: yesterday.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString()
  },
  {
    id: '4',
    title: 'Pay utility bills',
    description: 'Pay electricity, water, and internet bills',
    categoryId: '4',
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    dueDate: nextWeek.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString()
  },
  {
    id: '5',
    title: 'Team meeting',
    description: 'Weekly sync with the development team',
    categoryId: '1',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: tomorrow.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString()
  }
];
