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
  isLoading: boolean;
}
const initialState: PostsState = {
  postsOffline: [],
  pagination: {
    totalPages: 0,
  },
  isLoading: false,
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
    },
    appendPost: (state, action) => {
      state.postsOffline = [...state.postsOffline, ...action.payload.posts];
      state.pagination = {
        totalPages: action.payload.totalPages,
      };
    },
    resavePost: (state) => {
      state.postsOffline = [];
      state.pagination = {
        totalPages: 1,
      };
    },
  },
});

export const { savePost, appendPost, resavePost } = postsSlice.actions;
export default postsSlice.reducer;
