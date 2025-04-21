import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { DataContext } from "../context/DataContext";
import { Colors, Spacing, FontSizes } from "../theme";

export default function DetailScreen({ route }) {
  const post = route?.params?.post;
  const navigation = useNavigation();
  const { deletePost } = useContext(DataContext);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No post data available.</Text>
        <CustomButton title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deletePost(post.id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Edit Post"
          onPress={() => navigation.navigate("EditPost", { post })}
          backgroundColor={Colors.secondary}
          style={{ flex: 1, marginRight: Spacing.padding / 2 }}
        />
        <CustomButton
          title="Delete Post"
          onPress={handleDelete}
          backgroundColor={Colors.error}
          style={{ flex: 1, marginLeft: Spacing.padding / 2 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.padding,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: "bold",
    color: Colors.text,
    paddingHorizontal: 20,
  },
  body: {
    marginTop: Spacing.padding / 2,
    fontSize: FontSizes.medium,
    color: Colors.text,
    padding: Spacing.padding,
    borderRadius: Spacing.borderRadius,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: FontSizes.large,
    color: Colors.error,
    marginBottom: Spacing.padding,
  },
  buttonContainer: {
    marginTop: Spacing.padding * 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
