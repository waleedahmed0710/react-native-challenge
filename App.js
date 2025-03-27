import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { OfflineIndicator } from './components/common/OfflineIndicator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <View style={{ flex: 1 }}>
            <OfflineIndicator />
            <Slot />
          </View>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
} 