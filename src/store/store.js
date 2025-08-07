// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import docsReducer from '../features/docs/docsSlice'
import contentsReducer from '../features/contents/contentsSlice'

export const store = configureStore({
    reducer: {
        docs: docsReducer,
        contents: contentsReducer,
    },
})
