import React from 'react';
import { RootStack } from '../../types/types';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import EditPostScreen from '../screens/EditPostScreen';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="PostDetails" component={PostDetailsScreen} />
        <RootStack.Screen name="AddPost" component={AddPostScreen} />
        <RootStack.Screen name="EditPost" component={EditPostScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
