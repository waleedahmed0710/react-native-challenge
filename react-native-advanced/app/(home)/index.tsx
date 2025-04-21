import { View, Text, SafeAreaView, FlatList } from "react-native";
import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";
import { clientRequest } from "@/services/clientRequest";
import Loader from "@/components/ui/Loader";
import PostCard from "@/components/postCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/reducers";
import { appendPost, savePost } from "@/stores/reducers/postSlice";
import NetInfo from "@react-native-community/netinfo";
import styles from "../styles";
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
  const dispatch = useDispatch();

  const { postsOffline, pagination } = useSelector(
    (state: RootState) => state.posts
  );
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const network = await NetInfo.fetch();
      if (!network.isConnected) {
        // When network is avaliable fetch api
        const response = await clientRequest(
          "posts",
          "GET",
          null,
          {},
          currentPage
        );
        if (response.error !== null) {
          console.log(response.error);
          setLoading(false);
          return;
        }
        if (postsOffline.length == 0) {
          dispatch(savePost({ posts: posts, totalPages: currentPage }));
        }

        if (postsOffline.length > 0 && currentPage > pagination.totalPages) {
          dispatch(appendPost({ posts: posts, totalPages: currentPage }));
        }

        setTotalPage(response.totalPages);
        setPosts(response.data);
        setLoading(false);
      } else {
        // When network is not avaliable use data from device
        // Filter the posts for each current page
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const pagedPosts = postsOffline.slice(startIndex, endIndex);
        setPosts(pagedPosts);
        setTotalPage(postsOffline.length / 10);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <SafeAreaView style={styles.postsContainer}>
      <View>
        {!loading && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <PostCard
                  id={item.id}
                  title={item.title}
                  body={JSON.stringify(item.body)}
                />
              </View>
            )}
          />
        )}
      </View>
      <Loader visible={loading} />
      <View style={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}