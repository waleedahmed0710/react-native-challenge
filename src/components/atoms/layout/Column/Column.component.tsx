import React from "react";
import { View } from "react-native";
import { ColumnProps } from "./Column.types";
import { styles } from "./Column.styles";

export const Column: React.FC<ColumnProps> = ({
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
