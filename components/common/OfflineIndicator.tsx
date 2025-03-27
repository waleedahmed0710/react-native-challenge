import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const OfflineIndicator = () => {
  const isConnected = useNetworkStatus();
  
  console.log('OfflineIndicator: isConnected =', isConnected);

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 5,
  },
  banner: {
    backgroundColor: '#ff3b30',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 