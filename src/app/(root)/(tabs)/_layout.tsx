import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors";

const CustomTabBarIcons = ({
  title,
  focused,
  icon,
}: {
  focused: boolean;
  icon: keyof typeof Feather.glyphMap;
  title: string;
}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Feather
        name={icon}
        size={28}
        color={focused ? colors.primary : "#000"}
      />
    </View>
  );
};
const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabBarIcons focused={focused} icon={"home"} title="Home" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
