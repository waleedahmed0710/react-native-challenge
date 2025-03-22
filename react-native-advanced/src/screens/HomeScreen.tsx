import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import tw from 'tailwind-react-native-classnames';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import PostCard from '../components/PostCard';
import { usePostsStore } from '../store/usePostsStore';

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setPosts, posts } = usePostsStore();
  const [isOffline, setIsOffline] = React.useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
    onSuccess: (data) => {
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const displayPosts = data?.pages.flat() || posts;

  return (
    <View style={tw`flex-1`}>
      {isOffline && (
        <View style={tw`bg-red-500 py-2 px-4`}>
          <Text style={tw`text-white text-center`}>You're Offline</Text>
        </View>
      )}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreatePost')}
        style={tw`mx-4 my-2`}
      >
        Add New Post
      </Button>

      <FlatList
        contentContainerStyle={tw`p-4`}
        data={displayPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard item={item} onPress={() => navigation.navigate('Details', { item })} />
        )}
        onEndReached={hasNextPage ? fetchNextPage : undefined}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListFooterComponent={isFetching ? <Text style={tw`text-center`}>Loading...</Text> : null}
      />
    </View>
  );
};

export default HomeScreen;
