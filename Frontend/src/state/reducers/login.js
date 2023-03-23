import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, {
  LoginRequestEmail: (state, action) => {
    state.loading = true;
  },
  LoginSuccessEmail: (state, action) => {
    state.message = action.payload;
    state.loading = false;
    state.isAuthenticated = true;
  },
  LoginFailureEmail: (state, action) => {
    state.error = action.payload;
    state.loading = false;
  },
  LogoutRequest: (state, action) => {
    state.loading = true;
  },
  LogoutSuccess: (state, action) => {
    state.isAuthenticated = false;
    state.message = action.payload;
    state.loading = false;
  },
  clearError: (state, action) => {
    state.error = null;
  },
  clearMessage: (state, action) => {
    state.message = null;
  },

  RegisterRequest: (state, action) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.message = action.payload;
    state.loading = false;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.error = action.payload;
    state.loading = false;
  },
});
