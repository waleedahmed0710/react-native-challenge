import { TextInputProps as RNInputProps } from "react-native";

export interface TextInputProps extends RNInputProps {
  label?: string;
  error?: string;
}
