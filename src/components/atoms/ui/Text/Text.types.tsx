import { TextProps as RNTextProps, TextStyle } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: "heading" | "subtitle" | "body" | "caption";
  align?: TextStyle["textAlign"];
  color?: string;
}
