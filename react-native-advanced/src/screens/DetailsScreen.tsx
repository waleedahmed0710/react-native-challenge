import React, { useState } from 'react';
import { View, TextInput, Modal, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import tw from 'tailwind-react-native-classnames';
import { Button, Text, Card } from 'react-native-paper';
import {
  useRoute,
  useNavigation,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import { usePostStore } from '../store/usePostsStore';

type Post = {
  id: number;
  title: string;
  body: string;
};

type RootStackParamList = {
  Details: { item: Post };
  CreatePost: undefined;
};

const DetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { item } = route.params;

  const { updatePost, deletePost, queueOfflineDelete } = usePostStore();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const updateRemotePost = async (
    id: number,
    data: { title: string; body: string }
  ) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const deleteRemotePost = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
  };

  const onSave = async () => {
    setLoading(true);
    const net = await NetInfo.fetch();
  
    if (!net.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'You are offline',
        text2: 'Changes will sync when online.',
      });
      updatePost({ id: item.id, title, body, offline: true });
      setEditMode(false);
      setLoading(false);
      return;
    }
  
    try {
      await updateRemotePost(item.id, { title, body });
      updatePost({ id: item.id, title, body });
      Toast.show({ type: 'success', text1: 'Post updated' });
      setEditMode(false);
    } catch {
      Toast.show({ type: 'error', text1: 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setShowConfirmModal(false);

    const net = await NetInfo.fetch();

    if (!net.isConnected) {
      queueOfflineDelete(item);
      deletePost(item.id);
      Toast.show({ type: 'info', text1: 'Post deleted locally', text2: 'Will sync when online' });
      navigation.goBack();
      return;
    }

    try {
      await deleteRemotePost(item.id);
      deletePost(item.id);
      Toast.show({ type: 'success', text1: 'Post deleted' });
      navigation.goBack();
    } catch {
      Toast.show({ type: 'error', text1: 'Failed to delete post' });
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Card style={tw`mb-4`}>
        <Card.Title title={`Post #${item.id}`} />
        <Card.Content>
          {editMode ? (
            <>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
                style={tw`border-b border-gray-300 mb-4`}
              />
              <TextInput
                value={body}
                onChangeText={(text) => setBody(text)}
                placeholder="Body"
                multiline
                numberOfLines={4}
                style={tw`border-b border-gray-300`}
              />
            </>
          ) : (
            <>
              <Text style={tw`text-lg font-bold mb-2`}>{title}</Text>
              <Text>{body}</Text>
            </>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={editMode ? onSave : () => setEditMode(true)}
        loading={loading}
        disabled={loading}
      >
        {editMode ? 'Save' : 'Edit'}
      </Button>

      <View style={tw`h-2`} />

      <Button
        mode="contained"
        onPress={() => setShowConfirmModal(true)}
        style={tw`bg-red-600`}
        labelStyle={tw`text-white`}
      >
        Delete Post
      </Button>

      <Modal
        transparent
        visible={showConfirmModal}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg w-4/5`}>
            <Text style={tw`text-lg font-bold mb-4`}>Confirm Delete</Text>
            <Text style={tw`mb-6`}>Are you sure you want to delete this post?</Text>
            <View style={tw`flex-row justify-end`}>
              <Pressable onPress={() => setShowConfirmModal(false)}>
                <Text style={tw`mr-6 text-blue-500`}>Cancel</Text>
              </Pressable>
              <Pressable onPress={onDelete}>
                <Text style={tw`text-red-500`}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailsScreen;
