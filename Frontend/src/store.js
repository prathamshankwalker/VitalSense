import { configureStore } from "@reduxjs/toolkit"
import { memberAddReducer } from "./state/reducers/addMember"
import { authReducer } from "./state/reducers/login"
import { profileAuthReducer } from "./state/reducers/profile"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profileAuth: profileAuthReducer,
        member: memberAddReducer
    }
})