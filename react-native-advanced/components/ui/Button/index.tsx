import { Text, TouchableHighlight } from "react-native";
import styles from "./styles";
interface ButtonProps {
  title?: string;
  onPress?: () => void;
}
export default function Button({ title = "Button", onPress = () => {} }: ButtonProps) {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}
