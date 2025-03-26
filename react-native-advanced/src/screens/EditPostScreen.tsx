import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import PostForm from '../components/PostForm';
import { RootStackParamList } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type EditPostScreenRouteProp = RouteProp<RootStackParamList, 'EditPost'>;

interface Props {
  route: EditPostScreenRouteProp;
}

const EditPostScreen: React.FC<Props> = ({ route }) => {
  const { postId } = route.params;
  const post = useSelector((state: RootState) => state.posts.posts.find((post) => post.id === postId));


    if (!post) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.errorText}>Post not found</Text>
        </ScrollView>
      );
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post && <PostForm postId={post.id} initialTitle={post.title} initialBody={post.body} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default EditPostScreen;
