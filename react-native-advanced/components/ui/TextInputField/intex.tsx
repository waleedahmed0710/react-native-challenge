import { TextInput} from "react-native";
import styles from "./styles"; // Assuming styles are defined here

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}

export default function TextInputField({
  value,
  onChangeText = () => {},
  multiline = false,
  numberOfLines = 10,
  maxLength = 100,
}: TextInputFieldProps) {
  return (
    <TextInput
      style={[
        styles.container,
        multiline ? { height: 100 } : {},
      ]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : undefined} 
      maxLength={maxLength}
    />
  );
}
