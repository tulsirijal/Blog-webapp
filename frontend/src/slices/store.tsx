import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userPostSlice from "./userPostSlice";
export const store = configureStore({
    reducer:{
        auth:authSlice,
        userPost:userPostSlice
    }
})

export type RootState = ReturnType<typeof store.getState>