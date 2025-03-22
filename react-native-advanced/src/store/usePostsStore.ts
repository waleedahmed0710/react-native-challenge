import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Post = {
  id: number;
  title: string;
  body: string;
};

interface PostsState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
    }),
    {
      name: 'posts-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
