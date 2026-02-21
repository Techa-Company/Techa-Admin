// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import docsReducer from '../features/docs/docsSlice'
import contentsReducer from '../features/contents/contentsSlice'
import exercisesReducer from '../features/exercises/exercisesSlice'
import reviewsReducer from '../features/reviews/reviewsSlice'
import questionsReducer from '../features/questions/questionsSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        docs: docsReducer,
        contents: contentsReducer,
        exercises: exercisesReducer,
        users: usersReducer,
        reviews: reviewsReducer,
        questions: questionsReducer,
    },
})
