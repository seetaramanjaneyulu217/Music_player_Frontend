import { configureStore } from "@reduxjs/toolkit";
import songsReducer from './slices/song'

export const store = configureStore({
    reducer: {
        songs: songsReducer
    }
})