import { usePostsStore } from './usePostsStore';

export const usePostActions = () => {
  const posts = usePostsStore(state => state.posts);
  const setPosts = usePostsStore(state => state.setPosts);

  const updatePost = (updatedPost: { id: number; title: string; body: string }) => {
    const newPosts = posts.map(post =>
      post.id === updatedPost.id ? { ...post, ...updatedPost } : post
    );
    setPosts(newPosts);
  };

  const addPost = (newPost: { id: number; title: string; body: string }) => {
    setPosts([...posts, newPost]);
  };

  return {
    updatePost,
    addPost,
  };
};
