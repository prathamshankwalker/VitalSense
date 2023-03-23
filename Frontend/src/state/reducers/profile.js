import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const profileAuthReducer = createReducer(initialState, {
  ProfileRequest: (state, action) => {
    state.loading = true;
    state.hasProfile = false;
  },
  ProfileSuccess: (state, action) => {
    state.loading = false;
    state.hasProfile = true;
    state.message = action.payload``;
  },
  ProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
  clearMessage: (state, action) => {
    state.message = null;
  },
});
