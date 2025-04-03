import { store } from "./index";
import type { RootReducer } from "./index";

export type RootState = ReturnType<RootReducer>;
export type AppDispatch = typeof store.dispatch;
