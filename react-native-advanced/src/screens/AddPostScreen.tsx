
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';

const AddPostScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PostForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddPostScreen;
