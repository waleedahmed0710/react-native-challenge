import React from 'react';
import { RootStack } from '../../types/types';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Welcome">
        <RootStack.Screen
          name="Home"
          component={HomeScreen} 
          options={{
            headerTitle: "Posts",
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#a28ce0'
            }
          }}
        />
        <RootStack.Screen name="PostDetails" component={PostDetailsScreen} />
        <RootStack.Screen name="AddPost" component={AddPostScreen} />
        <RootStack.Screen name="EditPost" component={EditPostScreen} />
        <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
