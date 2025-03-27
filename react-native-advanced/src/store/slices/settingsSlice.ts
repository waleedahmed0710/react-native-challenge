import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';
import { RootState } from '..';


const initialState: SettingsState = {
  theme: 'light',
  defaultView: 'all',
};


const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setDefaultView: (state, action: PayloadAction<'all' | 'todo' | 'inProgress' | 'done'>) => {
      state.defaultView = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectDefaultView = (state: RootState) => state.settings.defaultView;

export const { setTheme, setDefaultView } = settingsSlice.actions;

export default settingsSlice.reducer;