import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./Slice/FetchPostSlice"

export const store = configureStore({
    reducer:{
        posts : postReducer,
    }
})