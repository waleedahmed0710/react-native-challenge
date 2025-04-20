import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.indigoDye,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'rgba(99, 99, 99, 0.2)',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,  
  },
  text: {
    color: Colors.whiteSmoke,
    fontSize: 16,
  }
});
