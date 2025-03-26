import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <PersistGate
         loading={
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        } 
          persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
