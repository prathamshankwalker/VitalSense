import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./state/reducers/activity";
import { memberAddReducer } from "./state/reducers/addMember";
import { ecgReducer } from "./state/reducers/ecg";
import { hypertensionReducer } from "./state/reducers/hypertension";
import { authReducer } from "./state/reducers/login";
import { profileAuthReducer } from "./state/reducers/profile";
import { memberViewReducer } from "./state/reducers/viewMember";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profileAuth: profileAuthReducer,
    member: memberAddReducer,
    hypertension: hypertensionReducer,
    activity: activityReducer,
    viewMember: memberViewReducer,
    ecg: ecgReducer,
  },
});
