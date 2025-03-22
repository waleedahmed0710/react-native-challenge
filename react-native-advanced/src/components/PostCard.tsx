import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Card, Text, useTheme } from 'react-native-paper';

type PostCardProps = {
  item: { id: number; title: string; body: string };
  onPress: () => void;
};

const PostCard: React.FC<PostCardProps> = React.memo(({ item, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity testID={`post-${item.id}`} onPress={onPress}>
      <Card style={[tw`mb-4`, { backgroundColor: theme.colors.surface }]} mode="elevated">
        <Card.Title title={item.title} />
        <Card.Content>
          <Text numberOfLines={2}>{item.body}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
});


export default PostCard;
