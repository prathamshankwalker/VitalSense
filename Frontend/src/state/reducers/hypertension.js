import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isHypertension: false,
};

export const hypertensionReducer = createReducer(initialState, {
  HyperRequest: (state, action) => {
    state.loading = true;
  },
  HyperSuccess: (state, action) => {
    state.loading = false;
    state.isHypertension = action.payload;
  },
  HyperError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});
