import React from 'react';
import Toast from 'react-native-toast-message';
import { queryClient } from './src/services';
import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
