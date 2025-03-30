import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
type ErrorBannerProps = {
  errorMessages: string[];
};
const ErrorBanner = ({ errorMessages }: ErrorBannerProps) => {
  return (
    errorMessages.length > 0 && (
      <View style={styles.errorBanner}>
        {errorMessages.map((message, index) => (
          <Text key={index} style={{ color: colors.white }}>
            {message}
          </Text>
        ))}
      </View>
    )
  );
};

export default ErrorBanner;

const styles = StyleSheet.create({
  errorBanner: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
