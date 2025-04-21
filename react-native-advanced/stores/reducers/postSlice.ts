import { createSlice } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  postsOffline: Post[];
  pagination: {
    totalPages: number;
  };
  savedAt?: string;
}
const initialState: PostsState = {
  postsOffline: [],
  pagination: {
    totalPages: 0,
  },
  savedAt: ""
};
const postsSlice = createSlice({
  name: "postsOffline",
  initialState,
  reducers: {
    savePost: (state, action) => {

      state.postsOffline = action.payload.posts;
      state.pagination = {
        totalPages: action.payload.totalPages,
      };
      state.savedAt = new Date().toISOString();
    },
    appendPost: (state, action) => {
      state.postsOffline = [...state.postsOffline, ...action.payload.posts];
      state.pagination = {
        totalPages: action.payload.totalPages,
      };
      state.savedAt = new Date().toISOString();
    },
    resetPost: (state) => {
      state.postsOffline = [];
      state.pagination = {
        totalPages: 0,
      };
      state.savedAt
    },
  },
});

export const { savePost, appendPost, resetPost } = postsSlice.actions;
export default postsSlice.reducer;
