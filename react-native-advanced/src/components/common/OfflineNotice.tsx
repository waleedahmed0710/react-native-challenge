import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { subscribeToNetworkChanges, NetworkStatus } from '../../utils/network';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Subscribe to network changes
    const unsubscribe = subscribeToNetworkChanges((state: NetworkStatus) => {
      setIsOffline(!state.isConnected);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isOffline) {
      // Animate in
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate out
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, animatedValue]);

  if (!isOffline) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          transform: [{ 
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            })
          }],
          opacity: animatedValue
        }
      ]}
    >
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B00020',
    height: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});