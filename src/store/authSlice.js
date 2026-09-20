import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  //→ abhi user logged in nahi hai
  userData: null,
  //→ abhi user ka data available nahi hai
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
