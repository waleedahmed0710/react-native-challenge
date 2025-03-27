import { configureStore } from '@reduxjs/toolkit';
import itemsReducer, { fetchItems, createPost, updatePost, deletePost } from '../itemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('itemsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        items: itemsReducer,
      },
    });
    jest.clearAllMocks();
  });

  const mockItem = {
    id: 1,
    title: 'Test Post',
    body: 'Test Body',
    userId: 1,
  };

  describe('fetchItems', () => {
    it('should fetch items successfully', async () => {
      const mockResponse = { data: [mockItem] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await store.dispatch(fetchItems());

      expect(store.getState().items.items).toEqual([mockItem]);
      expect(store.getState().items.loading).toBe(false);
      expect(store.getState().items.error).toBe(null);
    });

    it('should handle fetch error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await store.dispatch(fetchItems());

      expect(store.getState().items.error?.message).toBe('Failed to fetch posts');
      expect(store.getState().items.loading).toBe(false);
    });
  });

  describe('createPost', () => {
    it('should add item successfully', async () => {
      const mockResponse = { data: { ...mockItem, id: 101 } };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      await store.dispatch(createPost({ title: mockItem.title, body: mockItem.body }));

      expect(store.getState().items.items).toContainEqual(mockResponse.data);
      expect(store.getState().items.loading).toBe(false);
      expect(store.getState().items.error).toBe(null);
    });

    it('should handle add error', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Add failed'));

      await store.dispatch(createPost({ title: mockItem.title, body: mockItem.body }));

      expect(store.getState().items.error?.message).toBe('Failed to create post');
      expect(store.getState().items.loading).toBe(false);
    });
  });

  describe('updatePost', () => {
    it('should update item successfully', async () => {
      const updatedItem = { ...mockItem, title: 'Updated Title' };
      const mockResponse = { data: updatedItem };
      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      await store.dispatch(updatePost(updatedItem));

      expect(store.getState().items.items).toContainEqual(updatedItem);
      expect(store.getState().items.loading).toBe(false);
      expect(store.getState().items.error).toBe(null);
    });

    it('should handle update error', async () => {
      mockedAxios.put.mockRejectedValueOnce(new Error('Update failed'));

      await store.dispatch(updatePost(mockItem));

      expect(store.getState().items.error?.message).toBe('Failed to update post');
      expect(store.getState().items.loading).toBe(false);
    });
  });

  describe('deletePost', () => {
    it('should delete item successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: {} });

      await store.dispatch(deletePost(1));

      expect(store.getState().items.items).not.toContainEqual(mockItem);
      expect(store.getState().items.loading).toBe(false);
      expect(store.getState().items.error).toBe(null);
    });

    it('should handle delete error', async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error('Delete failed'));

      await store.dispatch(deletePost(1));

      expect(store.getState().items.error?.message).toBe('Failed to delete post');
      expect(store.getState().items.loading).toBe(false);
    });
  });

  describe('AsyncStorage persistence', () => {
    it('should persist items to AsyncStorage', async () => {
      const mockResponse = { data: [mockItem] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await store.dispatch(fetchItems());

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@posts',
        JSON.stringify([mockItem])
      );
    });

    it('should load items from AsyncStorage on initialization', async () => {
      const storedItems = [mockItem];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(storedItems));

      await store.dispatch(fetchItems());

      expect(store.getState().items.items).toEqual(storedItems);
    });
  });
}); 