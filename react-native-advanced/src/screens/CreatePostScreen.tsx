import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { usePostActions } from '../store/usePostActions';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { addPost } = usePostActions();
  const navigation = useNavigation();

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Both fields are required',
      });
      return;
    }

    const newPost = {
      id: Math.floor(Math.random() * 10000),
      title,
      body,
    };

    addPost(newPost);
    Toast.show({ type: 'success', text1: 'Post created' });
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Card>
        <Card.Content>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={tw`border-b border-gray-300 mb-4`}
          />
          <TextInput
            placeholder="Body"
            value={body}
            onChangeText={setBody}
            style={tw`border-b border-gray-300`}
            multiline
            numberOfLines={4}
          />
        </Card.Content>
      </Card>
      <Button style={tw`mt-4`} mode="contained" onPress={handleSave}>
        Save Post
      </Button>
    </View>
  );
};

export default CreatePostScreen;
