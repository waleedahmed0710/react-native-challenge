import { Redirect, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useNetInfo } from "@react-native-community/netinfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { store, persistor } from "@/store/index";
import "@/theme/unistyles";

export default function RootLayout() {
  const connection = useNetInfo();

  if (!connection.isConnected) {
    Toast.show({ type: "info", text1: "You are offline" });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Redirect href="/users" />
          <Stack />
          <Toast />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
