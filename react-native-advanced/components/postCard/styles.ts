import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    elevation: 8,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 20,
    borderRadius: 10
  },
  profile:{
    flex: 1,
    flexDirection: "row"
  },
  body: {
    fontSize: 14
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 5,
    marginBottom: 8 
  }
});
