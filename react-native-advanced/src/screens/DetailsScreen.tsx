import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const DetailsScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-xl font-bold text-gray-800`}>Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
