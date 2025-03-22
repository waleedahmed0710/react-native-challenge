import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import tw from 'tailwind-react-native-classnames';
import NetInfo from '@react-native-community/netinfo';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { usePostStore } from '../store/usePostsStore';
import { createRemotePost } from '../services/posts';

const CreatePostScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const { addPost } = usePostStore();
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      Toast.show({ type: 'error', text1: 'Both fields are required' });
      return;
    }
  
    setLoading(true);
    const net = await NetInfo.fetch();
  
    const newPost = {
      id: Math.floor(Math.random() * 10000),
      title,
      body,
    };
  
    if (!net.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'You are offline',
        text2: 'Post saved locally and will sync later',
      });
      addPost({ ...newPost, offline: true });
      setLoading(false);
      navigation.goBack();
      return;
    }
  
    try {
      await createRemotePost(newPost);
      addPost(newPost);
      Toast.show({ type: 'success', text1: 'Post created' });
      navigation.goBack();
    } catch {
      Toast.show({ type: 'error', text1: 'Creation failed' });
    } finally {
      setLoading(false);
    }
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
      <Button style={tw`mt-4`} mode="contained" onPress={handleSave} loading={loading} disabled={loading}>
        Save Post
      </Button>
    </View>
  );
};

export default CreatePostScreen;
function queueOfflineUpdate(newPost: {
    id: number; // local temp ID
    title: string; body: string;
}) {
    throw new Error('Function not implemented.');
}

