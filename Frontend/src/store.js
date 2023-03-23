import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./state/reducers/login"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})