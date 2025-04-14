import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorView from '@/components/errorview';

describe('ErrorView', () => {
  it('renders error message', () => {
    const { getByText } = render(<ErrorView message="Test error" />);
    expect(getByText('Test error')).toBeTruthy();
  });

  it('calls onRetry when button pressed', () => {
    const mockRetry = jest.fn();
    const { getByText } = render(
      <ErrorView message="Test error" onRetry={mockRetry} />
    );
    
    fireEvent.press(getByText('Try Again'));
    expect(mockRetry).toHaveBeenCalled();
  });
});