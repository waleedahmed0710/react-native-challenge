import React, { useState, useContext } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../context/DataContext";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Colors, Spacing, FontSizes } from "../theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditPostScreen({ route }) {
  const navigation = useNavigation();
  const post = route?.params?.post;
  const { updatePost } = useContext(DataContext);

  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const updated = { ...post, title, body };
    updatePost(updated);
    Alert.alert("Saved", `Title: ${title}\nBody: ${body}`);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraHeight={100}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.label}>Edit Title</Text>
          <CustomTextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />

          <Text style={styles.label}>Edit Body</Text>
          <CustomTextInput
            value={body}
            onChangeText={setBody}
            placeholder="Enter body"
            multiline
            style={styles.bodyInput}
          />

          <CustomButton
            title="Save Changes"
            onPress={handleSave}
            style={{ marginTop: Spacing.padding }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.padding,
  },
  header: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    marginBottom: Spacing.padding,
    color: Colors.text,
    alignSelf: "center",
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.padding,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    fontSize: FontSizes.medium,
    color: Colors.text,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: "top",
  },
});
