import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../store/store';
import { Card, Divider } from 'react-native-paper';

interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PostDetails'>;
  route: RouteProp<RootStackParamList, 'PostDetails'>;
}

const PostDetailsScreen: React.FC<IPageProps> = ({ route }) => {
  const { postId } = route.params;
  const post = useSelector((state: RootState) =>
    state.posts.posts.find(p => p.id === postId)
  );

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{post.title}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.body}>{post.body}</Text>

          <Divider style={styles.divider} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  divider: {
    marginVertical: 15,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
  },

});

export default PostDetailsScreen;
