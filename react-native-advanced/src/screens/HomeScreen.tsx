import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation, NavigationProp } from '@react-navigation/native'

import PostCard from '../components/PostCard';
import { usePostStore } from '../store/usePostsStore';
import { usePaginatedPosts } from '../hooks/usePaginatedPosts';
import { useSyncOfflineQueue } from '../hooks/useSyncOfflineQueue';
import NetworkStatusBanner from '../components/NetworkStatusBanner';

type Post = {
  id: number;
  title: string;
  body: string;
};

type RootStackParamList = {
  Details: { item: Post };
  CreatePost: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { posts: offlinePosts } = usePostStore();
  const [isOffline, setIsOffline] = useState(false);

  const defaultPost =[ {
    id: 0,
    title: 'Title',
    body: 'Body',
  }] as Post[];

  useSyncOfflineQueue();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
  } = usePaginatedPosts();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const displayPosts: Post[] = data?.pages.flat() as Post[] || offlinePosts;

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard item={item} onPress={() => navigation.navigate('Details', { item })} />
    ),
    [navigation]
  );

  return (
    <View style={tw`flex-1`}>
      <NetworkStatusBanner />
  
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreatePost')}
        style={tw`mx-4 my-2`}
      >
        Add New Post
      </Button>

      <FlatList
        contentContainerStyle={tw`p-4`}
        data={displayPosts ?? defaultPost}
        keyExtractor={(item: Post) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={
          hasNextPage ? () => fetchNextPage() : undefined
        }
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListFooterComponent={
          isFetching ? <Text style={tw`text-center mt-2`}>Loading...</Text> : null
        }
      />
    </View>
  );
};

export default HomeScreen;
