import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from '../src/components/PostCard';

const post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body',
};

describe('PostCard', () => {
  it('renders title and body correctly', () => {
    const { getByText } = render(<PostCard item={post} onPress={() => {}} />);
    expect(getByText('Test Post')).toBeTruthy();
    expect(getByText('This is a test post body')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<PostCard item={post} onPress={mockPress} />);
    fireEvent.press(getByTestId(`post-${post.id}`));
    expect(mockPress).toHaveBeenCalled();
  });
});
