import React from "react";
import { View } from "react-native";
import { styles } from "./Row.styles";
import { RowProps } from "./Row.types";

export const Row: React.FC<RowProps> = ({
  children,
  style,
  fullWidth,
  alignItems,
  justifyContent,
  flex,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        fullWidth && { width: "100%" },
        alignItems && { alignItems },
        justifyContent && { justifyContent },
        flex !== undefined && { flex },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
