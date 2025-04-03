import { stackUsersApi } from "@/features/stackUsers/stackUsersApi";
import { combineReducers } from "@reduxjs/toolkit";
import stackUserOverrides from "@/features/stackUsers/localOverridesSlice";

export const rootReducer = combineReducers({
  [stackUsersApi.reducerPath]: stackUsersApi.reducer,
  stackUserOverrides,
});
