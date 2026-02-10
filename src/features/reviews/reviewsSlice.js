// src/features/docs/reviewsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { deleteExercise, fetchReviewById, fetchReviews } from './reviewsActions'

const initialState = {
    reviews: [],
    singleReview: null,
    loading: false,
    error: null,
}


const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = action.payload
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchReviewById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.loading = false
                state.singleReview = action.payload
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteExercise.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteExercise.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(deleteExercise.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default reviewsSlice.reducer
