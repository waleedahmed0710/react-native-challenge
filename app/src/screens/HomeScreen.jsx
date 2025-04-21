// src/screens/HomeScreen.js
import React, { useContext } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { DataContext } from "../context/DataContext";
import FadeInView from "../components/FadeInView";
import PostCard from "../components/PostCard";
import { Colors, Spacing, FontSizes } from "../theme";

export default function HomeScreen({ navigation }) {
  const { posts, loading, refreshPosts } = useContext(DataContext);

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.emptyText}>
          No data available. Please check your connection.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={{ flex: 1 }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => (
            <View style={{ height: Spacing.padding }} />
          )}
          refreshing={loading}
          onRefresh={refreshPosts}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPress={() => navigation.navigate("Details", { post: item })}
              onEdit={() => navigation.navigate("EditPost", { post: item })}
            />
          )}
        />
      </FadeInView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePost")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.padding,
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.padding,
  },
  loadingText: {
    marginTop: 8,
    fontSize: FontSizes.medium,
    color: Colors.text,
  },
  emptyText: {
    fontSize: FontSizes.medium,
    color: Colors.text,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: "bold",
  },
});
