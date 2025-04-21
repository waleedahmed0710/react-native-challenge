import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from "./postSlice";
import myProfileReducer from "./myProfileSlice"
const rootReducer = combineReducers({
  posts: postsReducer,
  myProfile: myProfileReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;