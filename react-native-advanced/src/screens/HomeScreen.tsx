import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import tw from 'tailwind-react-native-classnames';

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`);
  return res.json();
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
  });

  const posts = data?.pages.flat() ?? [];

  return (
    <FlatList
      contentContainerStyle={tw`p-4`}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card
          style={[tw`mb-4`, { backgroundColor: theme.colors.surface }]}
          onPress={() => navigation.navigate('Details', { item })}
          mode="elevated"
        >
          <Card.Title title={item.title} />
          <Card.Content>
            <Text numberOfLines={2}>{item.body}</Text>
          </Card.Content>
        </Card>
      )}
      onEndReached={hasNextPage ? fetchNextPage : undefined}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      ListFooterComponent={isFetchingNextPage ? <Text style={tw`text-center`}>Loading more...</Text> : null}
    />
  );
};

export default HomeScreen;
