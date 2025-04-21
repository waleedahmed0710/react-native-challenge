import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import { DataProvider } from "./src/context/DataContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          gestureEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </DataProvider>
  );
}
