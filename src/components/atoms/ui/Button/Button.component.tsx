import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { ButtonProps } from "./Button.types";
import { styles as customStyles } from "./Button.styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  fullWidth,
  ...rest
}) => {
  const scale = useSharedValue(1);
  const { styles } = useStyles(customStyles);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.base,
          styles[variant],
          fullWidth && styles.fullWidth,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
