import { COLORS, FONTS } from "@/constants/theme";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorViewProps {
  message: string;
  onRetry?: () => void; // Made optional as its not needed in testing
}

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && ( // Only render button if onRetry is provided
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: FONTS.medium,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 8, android: 16 }),
    paddingBottom: 8,
  },
  emptyText: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
  },
  errorText: {
    fontSize: FONTS.small,
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ErrorView;