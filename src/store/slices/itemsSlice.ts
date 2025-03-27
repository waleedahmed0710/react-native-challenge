import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Item {
  id: number;
  title: string;
  body: string;
}

interface ErrorResponse {
  message: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: ErrorResponse | null;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const STORAGE_KEY = '@posts';

// Load posts from storage
const loadPostsFromStorage = async () => {
  try {
    const storedPosts = await AsyncStorage.getItem(STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : null;
  } catch (error) {
    console.error('Error loading posts from storage:', error);
    return null;
  }
};

// Save posts to storage
const savePostsToStorage = async (posts: Item[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts to storage:', error);
  }
};

export const fetchItems = createAsyncThunk<Item[], void, { rejectValue: ErrorResponse }>(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      // First try to load from storage
      const storedPosts = await loadPostsFromStorage();
      if (storedPosts) {
        return storedPosts;
      }

      // If no stored posts, fetch from API
      const response = await axios.get(API_URL);
      const posts = response.data;
      
      // Save to storage for future use
      await savePostsToStorage(posts);
      
      return posts;
    } catch (error) {
      return rejectWithValue({ message: 'Failed to fetch posts' });
    }
  }
);

export const createPost = createAsyncThunk<Item, Omit<Item, 'id'>, { rejectValue: ErrorResponse }>(
  'items/createPost',
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, post);
      const newPost = response.data;
      
      // Load existing posts from storage
      const storedPosts = await loadPostsFromStorage();
      const updatedPosts = [newPost, ...(storedPosts || [])];
      
      // Save updated posts to storage
      await savePostsToStorage(updatedPosts);
      
      return newPost;
    } catch (error) {
      return rejectWithValue({ message: 'Failed to create post' });
    }
  }
);

export const updatePost = createAsyncThunk<Item, Item, { rejectValue: ErrorResponse }>(
  'items/updatePost',
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${post.id}`, post);
      const updatedPost = response.data;
      
      // Load existing posts from storage
      const storedPosts = await loadPostsFromStorage();
      if (storedPosts) {
        const updatedPosts = storedPosts.map(p => p.id === updatedPost.id ? updatedPost : p);
        await savePostsToStorage(updatedPosts);
      }
      
      return updatedPost;
    } catch (error) {
      return rejectWithValue({ message: 'Failed to update post' });
    }
  }
);

export const deletePost = createAsyncThunk<number, number, { rejectValue: ErrorResponse }>(
  'items/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Load existing posts from storage
      const storedPosts = await loadPostsFromStorage();
      if (storedPosts) {
        const updatedPosts = storedPosts.filter(p => p.id !== id);
        await savePostsToStorage(updatedPosts);
      }
      
      return id;
    } catch (error) {
      return rejectWithValue({ message: 'Failed to delete post' });
    }
  }
);

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer; 