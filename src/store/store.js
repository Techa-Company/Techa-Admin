// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import docsReducer from '../features/docs/docsSlice'

export const store = configureStore({
    reducer: {
        docs: docsReducer,
    },
})
