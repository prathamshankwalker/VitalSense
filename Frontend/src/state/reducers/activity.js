import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  activity: "",
};

export const activityReducer = createReducer(initialState, {
  ActivityRequest: (state, action) => {
    state.loading = true;
  },
  ActivitySuccess: (state, action) => {
    state.loading = false;
    state.activity = action.payload;
  },
  ActivityError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});
