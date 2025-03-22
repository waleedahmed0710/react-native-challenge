import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Text, useTheme, Card } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';

const DetailsScreen: React.FC = () => {
  const route = useRoute();
  const theme = useTheme();
  const { item } = route.params as { item: any };

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

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

      <Button mode="contained" onPress={() => setEditMode(!editMode)}>
        {editMode ? 'Save' : 'Edit'}
      </Button>
    </View>
  );
};

export default DetailsScreen;
