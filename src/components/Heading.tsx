import { View, Text } from "react-native";
import React from "react";

type HeadingProps = {
  title: string;
  style?: object;
  textStyle?: object;
  onPress?: () => void;
};

const Heading = ({ title, textStyle, style }: HeadingProps) => {
  return (
    <View style={[{ padding: 10 }, style]}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export default Heading;
