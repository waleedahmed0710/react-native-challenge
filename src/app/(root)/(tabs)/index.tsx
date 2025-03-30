import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import HomeScreen from "@/src/screens/authenticated/HomeScreen";
export default function HomePage() {
  const router = useRouter();
  return <HomeScreen />;
}
