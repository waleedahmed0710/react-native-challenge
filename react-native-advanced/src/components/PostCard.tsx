import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type PostCardProps = {
  item: { id: number; title: string; body: string };
  onPress: () => void;
};

const PostCard: React.FC<PostCardProps> = ({ item, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={[tw`mb-4`, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
      >
        <Card.Title title={item.title} />
        <Card.Content>
          <Text numberOfLines={2}>{item.body}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default PostCard;
