import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import { Colors } from "@/constants/colors";
interface LoaderProps {
  visible: boolean;
}

export default function Loader({ visible }: LoaderProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={90} color={Colors.indigoDye} />
    </View>
  );
}