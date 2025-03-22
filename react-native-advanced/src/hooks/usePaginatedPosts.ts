import Toast from 'react-native-toast-message';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPosts } from '../services/posts';
import { usePostStore } from '../store/usePostsStore';

export const usePaginatedPosts = () => {
  const { setPosts } = usePostStore();

  const query = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length ? pages.length + 1 : undefined;
    },
    onSuccess: (data: { pages: any[]; }) => {
      const flat = data.pages.flat();
      setPosts(flat);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch posts',
        text2: 'You are offline or server is unreachable',
      });
    },
  });

  return query;
};
