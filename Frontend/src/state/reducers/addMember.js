import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  hasContacts: false,
};

export const memberAddReducer = createReducer(initialState, {
  MemberRequest: (state, action) => {
    state.loading = true;
  },
  MemberSuccess: (state, action) => {
    state.loading = false;
    state.hasContacts = true;
    state.message = action.payload;
  },
  MemberError: (state, action) => {
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
