// src/features/docs/exercisesSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateExercise, deleteExercise, fetchExerciseById, fetchExercises, fetchSubmittedExerciseById, fetchSubmittedExercises } from './exercisesActions'

const initialState = {
    exercises: [],
    submittedExercises: [],
    singleExercise: null,
    singleSubmittedExercise: null,
    loading: false,
    error: null,
}


const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchExercises.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.loading = false
                state.exercises = action.payload
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSubmittedExercises.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubmittedExercises.fulfilled, (state, action) => {
                state.loading = false
                state.submittedExercises = action.payload
            })
            .addCase(fetchSubmittedExercises.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExerciseById.fulfilled, (state, action) => {
                state.loading = false
                state.singleExercise = action.payload
            })
            .addCase(fetchExerciseById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSubmittedExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubmittedExerciseById.fulfilled, (state, action) => {
                state.loading = false
                state.singleSubmittedExercise = action.payload
            })
            .addCase(fetchSubmittedExerciseById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateExercise.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateExercise.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateExercise.rejected, (state, action) => {
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

export default exercisesSlice.reducer
