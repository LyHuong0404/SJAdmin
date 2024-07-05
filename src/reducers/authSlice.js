import { createSlice } from '@reduxjs/toolkit';

import { login, updateProfile, updateAvatar, logout } from 'actions/authActions';

// initialize TOKEN from local storage
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson)?.user || null;
const token = JSON.parse(userJson)?.accessToken || null;

const initialState = {
    show:false,
    loading: false,
    user: user,
    token: token,
    error: null,
    success: false,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.user = payload.user;
          state.token = payload.accessToken;
          state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
      })
      .addCase(updateProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.user = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.show = true;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
      });
    },
});
export default userSlice.reducer;

