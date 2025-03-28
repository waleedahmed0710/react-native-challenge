import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  PostDetails: { postId: number };
  AddPost: undefined;
  EditPost: { postId: number };
  Welcome: undefined;
};

export type Post = {
  id: number;
  title: string;
  body: string;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
