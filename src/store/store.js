// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import docsReducer from '../features/docs/docsSlice'
import contentsReducer from '../features/contents/contentsSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
    reducer: {
        docs: docsReducer,
        contents: contentsReducer,
        users: usersReducer
    },
})
