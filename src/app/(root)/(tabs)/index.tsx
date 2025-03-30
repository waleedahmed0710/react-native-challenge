import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
export default function HomePage() {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/onboarding/onboarding")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text>HomePage</Text>
    </View>
  );
}
