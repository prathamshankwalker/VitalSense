import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  issue: ""
};

export const ecgReducer = createReducer(initialState, {
  EcgRequest: (state, action) => {
    state.loading = true;
  },
  EcgSuccess: (state, action) => {
    state.loading = false;
    state.issue = action.payload;
  },
  EcgError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});
