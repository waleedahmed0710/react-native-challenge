import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import HomeScreen from './screens/HomeScreen';
import store, { persistor } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
}
