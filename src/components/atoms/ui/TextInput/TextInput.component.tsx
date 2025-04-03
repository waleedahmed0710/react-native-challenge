import React from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";
import { TextInputProps } from "./TextInput.types";
import { styles as customStyles } from "./TextInput.styles";
import { useStyles } from "react-native-unistyles";

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  style,
  ...rest
}) => {
  const { styles } = useStyles(customStyles);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
