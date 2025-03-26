import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';

type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

interface IPageProps {
  route: PostDetailsScreenRouteProp;
}

const PostDetailsScreen: React.FC<IPageProps> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post ID: {route.params.postId}</Text>
      <Text>More details about this post...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PostDetailsScreen;
