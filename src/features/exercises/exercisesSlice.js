// src/features/docs/exercisesSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateExercise, deleteExercise, fetchExerciseById, fetchExercises } from './exercisesActions'

const initialState = {
    exercises: [],
    singleExercise: null,
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
