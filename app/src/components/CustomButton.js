import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes } from "../theme";

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  backgroundColor = Colors.primary,
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {typeof title === "string" ? (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    ) : (
      title
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: Spacing.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: FontSizes.medium,
  },
});

export default CustomButton;
