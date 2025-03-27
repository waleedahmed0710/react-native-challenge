import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux"

import HomeScreen from "../screens/Home"
import TaskDetailScreen from "../screens/TaskDetail"
import TaskFormScreen from "../screens/TaskForm"
import SettingsScreen from "../screens/Settings"
import type { RootStackParamList } from "../types"
import { selectTheme } from "../store/slices/settingsSlice"
import SplashScreen from "../screens/SplashScreen"

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

// Bottom tabs for main app flow
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: "#6200EE",
        },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Task Tracker",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </Tab.Navigator>
  )
}

// Main stack navigator
const AppNavigator = () => {
  const theme = useSelector(selectTheme)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            headerShown: true,
            headerTitle: "Task Details",
            headerStyle: {
              backgroundColor: "#6200EE",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={({ route }) => ({
            headerShown: true,
            headerTitle: route.params?.taskId ? "Edit Task" : "Create Task",
            headerStyle: {
              backgroundColor: "#6200EE",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

