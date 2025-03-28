import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10); // Limit initial fetch to 10 posts
});

export const createPost = createAsyncThunk(
  'posts/createPost', 
  async (post: { title: string, body: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, post);
      console.log('Create Post Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create Post Error:', error);
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk('posts/updatePost', async (post: { id: number, title: string, body: string }) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  return response.data;
});

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add a manual add post reducer for local state management
    addPost: (state, action) => {
      console.log('Manually adding post:', action.payload);
      state.posts.unshift({
        ...action.payload,
        id: Math.max(...state.posts.map(p => p.id), 0) + 1
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Only add posts not already in the state
        const newPosts = action.payload.filter(
          (newPost : Post) => !state.posts.some(existingPost => existingPost.id === newPost.id)
        );
        state.posts = [...newPosts, ...state.posts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Create Post Fulfilled:', action.payload);
        // Ensure the new post is added at the top
        state.posts.unshift({
          ...action.payload,
          id: Math.max(...state.posts.map(p => p.id), 0) + 1
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
        console.error('Create Post Error in Reducer:', action.error);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
