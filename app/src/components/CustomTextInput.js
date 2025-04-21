import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes } from "../theme";

const CustomTextInput = ({ style, ...props }) => (
  <TextInput style={[styles.input, style]} {...props} />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: Spacing.borderRadius,
    padding: 12,
    marginBottom: Spacing.padding,
    fontSize: FontSizes.medium,
    color: Colors.text,
  },
});

export default CustomTextInput;
