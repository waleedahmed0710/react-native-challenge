import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Post = {
  offline?: boolean;
  id: number;
  title: string;
  body: string;
};

interface PostState {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    offlineQueue: Post[];
    addPost: (post: Post) => void;
    queueOfflineUpdate: (post: Post) => void;
    flushOfflineQueue: (syncFn: (post: Post) => Promise<void>) => Promise<void>;
    updatePost: (post: Post) => void;
    deletePost: (id: number) => void;
    queueOfflineDelete: (post: Post) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      updatePost: (post) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === post.id ? { ...p, ...post, offline: post.offline ?? p.offline } : p
          ),
        }));
      },
      offlineQueue: [],
      addPost: (post) =>
        set((state) => ({
          posts: [{ ...post, offline: post.offline ?? false }, ...state.posts],
        })),
      queueOfflineUpdate: (post) =>
        set((state) => ({
          offlineQueue: [...state.offlineQueue, post],
        })),
      flushOfflineQueue: async (syncFn) => {
        const queue = get().offlineQueue;
        for (const post of queue) {
          try {
            await syncFn(post);
            get().updatePost(post);
          } catch (e) {
            return;
          }
        }
        set({ offlineQueue: [] });
      },
      deletePost: (id: number) =>
        set((state) => ({
          posts: state.posts.filter((p: Post) => p.id !== id),
        })),
      queueOfflineDelete: (post) =>
        set((state) => ({
          offlineQueue: [...state.offlineQueue, { ...post, _delete: true }],
        })),
    }),
    {
      name: 'posts-actions-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
