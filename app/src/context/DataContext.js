import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPosts } from "../services/api";

export const DataContext = createContext();

const SET_POSTS = "SET_POSTS";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  loading: true,
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const loadData = async () => {
    try {
      const posts = await fetchPosts();
      dispatch({ type: SET_POSTS, payload: posts });
      await AsyncStorage.setItem("cachedPosts", JSON.stringify(posts));
    } catch (error) {
      const cached = await AsyncStorage.getItem("cachedPosts");
      if (cached) {
        dispatch({ type: SET_POSTS, payload: JSON.parse(cached) });
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addPost = async (post) => {
    const updatedPosts = [post, ...state.posts];
    dispatch({ type: ADD_POST, payload: post });
    await AsyncStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));
  };

  const updatePost = async (updatedPost) => {
    const updatedPosts = state.posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    dispatch({ type: UPDATE_POST, payload: updatedPost });
    await AsyncStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));
  };

  const deletePost = async (postId) => {
    const updatedPosts = state.posts.filter((p) => p.id !== postId);
    dispatch({ type: DELETE_POST, payload: postId });
    await AsyncStorage.setItem("cachedPosts", JSON.stringify(updatedPosts));
  };

  return (
    <DataContext.Provider value={{ ...state, addPost, updatePost, deletePost }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
