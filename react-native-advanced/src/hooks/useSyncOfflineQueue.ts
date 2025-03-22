import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { usePostStore } from '../store/usePostsStore';
import Toast from 'react-native-toast-message';

const updateRemotePost = async (post: { id: number; title: string; body: string }) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
};

export const useSyncOfflineQueue = () => {
  const { flushOfflineQueue } = usePostStore();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        flushOfflineQueue(updateRemotePost).then(() => {
          Toast.show({ type: 'success', text1: 'Offline changes synced' });
        });
      }
    });
    return () => unsubscribe();
  }, []);
};
