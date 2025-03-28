import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createPost, updatePost } from '../store/postsSlice';
import { AppDispatch } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

interface PostFormProps {
  postId?: number; 
  initialTitle?: string;
  initialBody?: string;
}

const PostForm: React.FC<PostFormProps> = ({ 
  postId, 
  initialTitle = '', 
  initialBody = '' 
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [body, setBody] = useState<string>(initialBody);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    // Validate inputs
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!body.trim()) {
      setError('Body is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if postId is provided to determine if it's an update or create
      if (postId) {
        // Update existing post
        await dispatch(updatePost({ 
          id: postId, 
          title: title.trim(), 
          body: body.trim() 
        })).unwrap();

      } else {
        // Create new post
        await dispatch(createPost({ 
          title: title.trim(), 
          body: body.trim() 
        })).unwrap();
      }

      // Navigate back to home screen, replacing AddPost screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } catch (err) {
      // Handle any errors during post creation/update
      setError('Failed to save post. Please try again.');
      console.error('Full Error Details:', err);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Post Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
        dense
        multiline
        numberOfLines={2}
        disabled={isLoading}
      />
      
      <TextInput
        label="Post Body"
        value={body}
        onChangeText={setBody}
        style={styles.multilineInput}
        mode="outlined"
        multiline
        numberOfLines={5}
        disabled={isLoading}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Button 
        mode="contained" 
        onPress={handleSave}
        style={styles.saveButton}
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Post'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  multilineInput: {
    marginBottom: 15,
    backgroundColor: 'white',
    minHeight: 120,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 10,
    padding: 5,
  },
});

export default PostForm;
