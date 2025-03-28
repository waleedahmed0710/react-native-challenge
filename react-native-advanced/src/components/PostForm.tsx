import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../store/postsSlice';

interface PostFormProps {
  postId?: number; 
  initialTitle?: string;
  initialBody?: string;
}

const PostForm: React.FC<PostFormProps> = ({ postId, initialTitle, initialBody }) => {
  const [title, setTitle] = useState<string>(initialTitle || '');
  const [body, setBody] = useState<string>(initialBody || '');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title || !body) {
      setError('Title and body are required');
      return;
    }

    if (postId) {
      dispatch(updatePost({ id: postId, title, body }));
    } else {
      dispatch(createPost({ title, body }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Post Title"
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholder="Post Body"
        multiline
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Save Post" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PostForm;
