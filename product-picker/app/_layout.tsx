import {store} from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="product_description" options={{ headerShown: false, gestureEnabled: false}} />
      </Stack>
    </Provider>
  );
}
