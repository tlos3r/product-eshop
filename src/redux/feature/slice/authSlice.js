import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: null,
  userName: null,
  userID: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID } = action.payload
      state.loggedIn = true
      state.email = email
      state.userName = userName
      state.userID = userID
    },
    REMOVE_ACTIVE_USER(state) {
      state.loggedIn = false
      state.email = null
      state.userName = null
      state.userID = null
    }
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectLoggedIn = (state) => state.auth.loggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID


export default authSlice.reducer;
