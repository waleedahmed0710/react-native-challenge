import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '@/app/(tabs)/home/index';

// Mock the hooks
jest.mock('@/app/hooks/useHome', () => ({
  __esModule: true,
  default: () => ({
    username: 'Test User',
    currentPage: 1,
    filteredTodos: [
      { id: 1, userId: 1, title: 'Test Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Test Todo 2', completed: true },
    ],
    totalPages: 1,
    startIndex: 0,
    endIndex: 10,
    selectedFilter: 'all',
    setSelectedFilter: jest.fn(),
    goToNextPage: jest.fn(),
    goToPrevPage: jest.fn(),
    goToPage: jest.fn(),
  }),
}));

jest.mock('@/app/hooks/useTodoData', () => ({
  __esModule: true,
  default: () => ({
    isAddModalVisible: false,
    editedTitle: '',
    setEditedTitle: jest.fn(),
    isCompleted: false,
    setIsCompleted: jest.fn(),
    todos: [
      { id: 1, userId: 1, title: 'Test Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Test Todo 2', completed: true },
    ],
    deletedTodos: [],
    isLoading: false,
    error: null,
    updateLoading: false,
    handleOptionPress: jest.fn(),
    handleUpdateTodo: jest.fn(),
    handleDeleteTodo: jest.fn(),
    handleRestoreTodo: jest.fn(),
    handleModalClose: jest.fn(),
  }),
}));

// Mock components
jest.mock('@/app/components/TodoItem', () => 'TodoItem');
jest.mock('@/app/components/DeletedTodoItem', () => 'DeletedTodoItem');
jest.mock('@/app/components/modals/TodoModal', () => 'TodoModal');
jest.mock('@/app/components/Pagination', () => 'Pagination');
jest.mock('@/app/components/FilterButtons', () => 'FilterButtons');

// Mock expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock context
jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({
    items: [
      { id: 1, userId: 1, title: 'Test Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Test Todo 2', completed: true },
    ],
  })),
  useDispatch: () => jest.fn(),
}));

describe('Home Component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
});
