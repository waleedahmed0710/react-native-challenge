import React from "react";
import { View } from "react-native";
import { SpacerProps } from "./Spacer.types";

export const Spacer: React.FC<SpacerProps> = ({ size = 8, horizontal }) => {
  return (
    <View
      testID="spacer"
      style={horizontal ? { width: size } : { height: size }}
    />
  );
};
