import { createSlice } from "@reduxjs/toolkit";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Profile {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface MyProfileState {
  userId: number;
  profileOffline: Profile | null;
}
const initialState:MyProfileState = {
  userId: 0,
  profileOffline: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileId: (state, action) => {
      state.userId = action.payload.id;
    },
    setProfileOffline: (state, action) => {
      state.profileOffline = action.payload.profile
    }
  },
});

export const { setProfileId, setProfileOffline } = profileSlice.actions;
export default profileSlice.reducer;