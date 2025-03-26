import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import TodoProvider from './context/TodoContext';
import { store } from '@/services/storage/redux/store';
import { asyncStore } from '@/services/storage/redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={asyncStore}>
        <TodoProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TodoProvider>
      </PersistGate>
    </Provider>
  );
}
