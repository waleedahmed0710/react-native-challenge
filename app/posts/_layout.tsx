import { Stack } from 'expo-router';

export default function PostsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ 
          title: 'Posts',
        }}
      />
      <Stack.Screen 
        name="[id]"
        options={{ 
          title: 'Post Details',
        }}
      />
    </Stack>
  );
} 