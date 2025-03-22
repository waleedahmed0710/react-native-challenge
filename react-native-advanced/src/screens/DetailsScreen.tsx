import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { usePostActions } from '../store/usePostActions';

const DetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params as { item: any };
  const { updatePost } = usePostActions();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  const onSave = async () => {
    try {
      updatePost({ id: item.id, title, body });
      Toast.show({
        type: 'success',
        text1: 'Post updated',
      });
      setEditMode(false);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save post',
        text2: 'Please try again later',
      });
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
                onChangeText={setTitle}
                placeholder="Title"
                style={tw`border-b border-gray-300 mb-4`}
              />
              <TextInput
                value={body}
                onChangeText={setBody}
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

      <Button mode="contained" onPress={editMode ? onSave : () => setEditMode(true)}>
        {editMode ? 'Save' : 'Edit'}
      </Button>
    </View>
  );
};

export default DetailsScreen;
