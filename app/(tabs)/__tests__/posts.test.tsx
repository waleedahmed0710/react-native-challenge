import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PostsScreen from '../posts';
import itemsReducer from '@/src/store/slices/itemsSlice';
import { fetchItems } from '@/src/store/slices/itemsSlice';
import NetInfo from '@react-native-community/netinfo';

// Mock the Redux actions
jest.mock('@/src/store/slices/itemsSlice', () => ({
  ...jest.requireActual('@/src/store/slices/itemsSlice'),
  fetchItems: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

const mockItems = [
  { id: 1, title: 'Test Post 1', body: 'Test Body 1' },
  { id: 2, title: 'Test Post 2', body: 'Test Body 2' },
];

describe('PostsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchItems as jest.Mock).mockImplementation(() => ({
      type: 'items/fetchItems/fulfilled',
      payload: mockItems,
    }));
  });

  it('renders loading state initially', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders posts list after loading', async () => {
    const { getByText, queryByTestId } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(getByText('Test Post 1')).toBeTruthy();
    expect(getByText('Test Post 2')).toBeTruthy();
  });

  it('handles search functionality', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Test Post 1')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Search by title or ID...');
    fireEvent.changeText(searchInput, 'Test Post 1');

    expect(getByText('Test Post 1')).toBeTruthy();
    expect(queryByText('Test Post 2')).toBeNull();
  });

  it('handles pagination', async () => {
    const { getByText, queryByText } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Test Post 1')).toBeTruthy();
    });

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    expect(queryByText('Test Post 1')).toBeNull();
    expect(getByText('Test Post 2')).toBeTruthy();
  });

  it('handles refresh functionality', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByTestId('posts-list')).toBeTruthy();
    });

    const refreshControl = getByTestId('refresh-control');
    fireEvent.refresh(refreshControl);

    expect(fetchItems).toHaveBeenCalledTimes(2); // Initial load + refresh
  });

  it('handles network error during refresh', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValueOnce({ isConnected: false });

    const { getByTestId, getByText } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByTestId('posts-list')).toBeTruthy();
    });

    const refreshControl = getByTestId('refresh-control');
    fireEvent.refresh(refreshControl);

    expect(getByText('No Internet Connection')).toBeTruthy();
  });

  it('navigates to create post screen', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Create Post')).toBeTruthy();
    });

    const createButton = getByText('Create Post');
    fireEvent.press(createButton);

    // Verify navigation (mocked in jest.setup.js)
    expect(require('expo-router').useRouter().push).toHaveBeenCalledWith('/posts/new');
  });

  it('handles error state', async () => {
    (fetchItems as jest.Mock).mockImplementation(() => ({
      type: 'items/fetchItems/rejected',
      error: { message: 'Test error' },
    }));

    const { getByText } = render(
      <Provider store={mockStore}>
        <PostsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Error: Test error')).toBeTruthy();
    });

    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);

    expect(fetchItems).toHaveBeenCalled();
  });
}); 