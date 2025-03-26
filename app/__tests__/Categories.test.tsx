import React from 'react';
import { render } from '@testing-library/react-native';
import Categories from '@/app/(tabs)/categories/index';

// Create different mock states
const normalState = {
  categories: [
    { id: '1', name: 'Work', color: '#4285F4', count: 3 },
    { id: '2', name: 'Personal', color: '#EA4335', count: 5 },
    { id: '3', name: 'Shopping', color: '#FBBC05', count: 2 },
  ],
  isLoading: false,
  modalVisible: false,
  editingCategory: null,
  categoryName: '',
  categoryColor: '#4285F4',
  categoryTodosModalVisible: false,
  selectedCategory: null,
  setCategoryName: jest.fn(),
  setCategoryColor: jest.fn(),
  handleSaveCategory: jest.fn(),
  handleDeleteCategory: jest.fn(),
  openAddModal: jest.fn(),
  openEditModal: jest.fn(),
  closeModal: jest.fn(),
  openCategoryTodosModal: jest.fn(),
  closeCategoryTodosModal: jest.fn(),
  getCategoryTodos: jest.fn(() => []),
  toggleTodoCompletion: jest.fn(),
  categoryColors: [
    '#4285F4',
    '#EA4335',
    '#FBBC05',
    '#34A853',
    '#8E44AD',
    '#FF5722',
    '#009688',
    '#F44336',
    '#9C27B0',
    '#2196F3',
  ],
  randomizeTodoCategories: jest.fn(),
};

const loadingState = {
  ...normalState,
  categories: [],
  isLoading: true,
};

const emptyState = {
  ...normalState,
  categories: [],
  isLoading: false,
};

// Mock default state
let mockCategoriesState = normalState;

// Mock useCategories hook
jest.mock('@/app/hooks/useCategories', () => ({
  __esModule: true,
  default: () => mockCategoriesState,
}));

// Mock components
jest.mock('@/app/components/CategoryItem', () => 'CategoryItem');
jest.mock('@/app/components/modals/CategoryModal', () => 'CategoryModal');
jest.mock('@/app/components/modals/CategoryTodosModal', () => 'CategoryTodosModal');

// Mock expo modules
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('Categories Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    mockCategoriesState = normalState;
    const { toJSON } = render(<Categories />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders loading state correctly', () => {
    mockCategoriesState = loadingState;
    const { toJSON } = render(<Categories />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders empty state correctly', () => {
    mockCategoriesState = emptyState;
    const { toJSON } = render(<Categories />);
    expect(toJSON()).toMatchSnapshot();
  });
});
