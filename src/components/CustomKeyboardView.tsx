import { KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

const CustomKeyboardView = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
