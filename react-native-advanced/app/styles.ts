import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  postsContainer: {
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
    padding: 15,
    flexDirection: "column",
    paddingBottom: 60,
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: Colors.whiteSmoke,
    padding: 10,
    zIndex: 10,
  },
  postCard: {
    marginTop: 15,
    marginBottom: 15,
  },
  myProfileContainer: {
    flex: 1,
    padding: 15,
  },
  label :{
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5
  },
  formControl: {
    marginTop: 20,
  },
  textInfo: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: 700
  },
  divider: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc"
  },
  notFoundContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  notFoundHeader: {
    fontSize: 30,
    fontWeight: 600
  }
});
