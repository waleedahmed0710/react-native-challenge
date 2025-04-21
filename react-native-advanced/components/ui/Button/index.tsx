import { Text, TouchableHighlight } from "react-native";
import styles from "./styles";
interface ButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}
export default function Button({
  title = "Button",
  onPress = () => {},
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableHighlight
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}
