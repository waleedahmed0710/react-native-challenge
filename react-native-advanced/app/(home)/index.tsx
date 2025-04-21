import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/reducers";
import { clientRequest } from "@/services/clientRequest";
import { appendPost, resetPost, savePost } from "@/stores/reducers/postSlice";
import Pagination from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";
import PostCard from "@/components/postCard";
import styles from "../styles";
import Button from "@/components/ui/Button";
import { isOlderThanTwoDays } from "@/utils/isOlderThanTwoDays";

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Posts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const dispatch = useDispatch();
  const { postsOffline, pagination, savedAt } = useSelector(
    (state: RootState) => state.posts
  );
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      if (isConnected) {
        setLoading(true);
        setErrorMessage("");
        const response = await clientRequest(
          "posts",
          "GET",
          null,
          {},
          currentPage
        );

        if (response.error !== null) {
          setErrorMessage("Failed to load posts. Please try again later.");
          setLoading(false);
          setPosts([]);
          return;
        }

        if (response.data === 0) {
          setErrorMessage("No posts available");
          setLoading(false);
          setPosts([]);
          return;
        }

        // If data is older than 2 days, reset and fetch fresh the device back online
        if (isOlderThanTwoDays(savedAt)) {
          dispatch(resetPost());
          dispatch(savePost({ posts: response.data, totalPages: currentPage }));
        } else if (postsOffline.length === 0) {
          dispatch(savePost({ posts: response.data, totalPages: currentPage }));
        } else if (
          postsOffline.length > 0 &&
          currentPage > pagination.totalPages
        ) {
          dispatch(
            appendPost({ posts: response.data, totalPages: currentPage })
          );
        }

        setLoading(false);
        setPosts(response.data);
        setTotalPage(response.totalPages);
      } else {
        // Fetch posts from the device when the user is offline
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const pagedPosts = postsOffline.slice(startIndex, endIndex);
        setPosts(pagedPosts);
        setTotalPage(Math.ceil(postsOffline.length / 10));
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, postsOffline, pagination, dispatch, isConnected]);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, fetchPosts, isConnected]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <SafeAreaView style={styles.postsContainer}>
      <View>
        {!loading && errorMessage !== "" && (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundHeader}>{errorMessage}</Text>
            <Button title="Retry" onPress={fetchPosts} />
          </View>
        )}

        {!loading && posts.length > 0 && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <PostCard id={item.id} title={item.title} body={item.body} />
              </View>
            )}
          />
        )}
      </View>

      <Loader visible={loading} />

      {posts.length > 0 && !loading && (
        <View style={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
