import React from 'react';
import { render } from '@testing-library/react-native';
import TodoItem from '@/app/components/TodoItem';

// Mock expo modules
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('TodoItem Component', () => {
  const mockOnOptionPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders completed todo correctly', () => {
    const completedTodo = {
      id: 1,
      userId: 1,
      title: 'Completed Todo Item',
      completed: true,
    };

    const { toJSON } = render(<TodoItem todo={completedTodo} onOptionPress={mockOnOptionPress} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders incomplete todo correctly', () => {
    const incompleteTodo = {
      id: 2,
      userId: 1,
      title: 'Incomplete Todo Item',
      completed: false,
    };

    const { toJSON } = render(<TodoItem todo={incompleteTodo} onOptionPress={mockOnOptionPress} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
