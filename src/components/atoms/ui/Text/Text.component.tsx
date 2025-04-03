import React from "react";
import { Text as RNText } from "react-native";
import { TextProps } from "./Text.types";
import { styles } from "./Text.styles";

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  align,
  color,
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[
        styles[variant],
        align && { textAlign: align },
        color && { color },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
