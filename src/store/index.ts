import { configureStore } from "@reduxjs/toolkit";
import { stackUsersApi } from "@/features/stackUsers/stackUsersApi";
import { rootReducer } from "./rootReducer";
import { persistStore } from "redux-persist";
import { persistReducer } from "./persist";
import { localUsersApi } from "@/features/localUsers/localUsersApi";
import { rootReducer as baseReducer } from "./rootReducer";

export const store = configureStore({
  reducer: persistReducer(rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(stackUsersApi.middleware)
      .concat(localUsersApi.middleware),
});

export const persistor = persistStore(store);
export type RootReducer = typeof baseReducer;
