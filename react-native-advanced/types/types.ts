import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  PostDetails: { postId: number };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
