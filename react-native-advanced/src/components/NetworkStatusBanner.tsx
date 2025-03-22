import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const NetworkStatusBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  if (!isOffline) return null;

  return (
    <View style={tw`bg-red-600 py-1`}>
      <Text style={tw`text-white text-center text-xs`}>You are offline</Text>
    </View>
  );
};

export default NetworkStatusBanner;