import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StackUser } from "../stackUsers/types";

type OverrideState = Record<number, StackUser>;

const initialState: OverrideState = {};

const localOverridesSlice = createSlice({
  name: "stackUserOverrides",
  initialState,
  reducers: {
    addOverride: (state, action: PayloadAction<StackUser>) => {
      state[action.payload.user_id] = action.payload;
    },
    removeOverride: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    resetOverrides: () => initialState,
  },
});

export const { addOverride, removeOverride, resetOverrides } =
  localOverridesSlice.actions;
export default localOverridesSlice.reducer;
