import React from 'react';
import { render } from '@testing-library/react-native';
import DeletedTodoItem from '@/app/components/DeletedTodoItem';

// Mock expo modules
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('DeletedTodoItem Component', () => {
  const mockOnRestore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders completed deleted todo correctly', () => {
    const completedDeletedTodo = {
      id: 1,
      userId: 1,
      title: 'Completed Deleted Todo Item',
      completed: true,
      deletedAt: Date.now() - 3600000, // deleted 1 hour ago
    };

    const { toJSON } = render(
      <DeletedTodoItem todo={completedDeletedTodo} onRestore={mockOnRestore} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders incomplete deleted todo correctly', () => {
    const incompleteDeletedTodo = {
      id: 2,
      userId: 1,
      title: 'Incomplete Deleted Todo Item',
      completed: false,
      deletedAt: Date.now() - 43200000, // deleted 12 hours ago
    };

    const { toJSON } = render(
      <DeletedTodoItem todo={incompleteDeletedTodo} onRestore={mockOnRestore} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
