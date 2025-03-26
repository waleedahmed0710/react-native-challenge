import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<IPageProps> = ({ navigation }) => {  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to the Home Screen!</Text>
      <Button onPress={() => navigation.navigate('PostDetails', { postId: 1 })}>
        Go to Details
      </Button>
    </View>
  )
}

export default HomeScreen;
