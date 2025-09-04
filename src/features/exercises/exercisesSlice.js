// src/features/docs/exercisesSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchExercises } from './exercisesActions'

const initialState = {
    exercises: [],
    singleExercises: null,
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
        // .addCase(fetchDocById.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(fetchDocById.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.singleDoc = action.payload
        // })
        // .addCase(fetchDocById.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // })
        // .addCase(createAndUpdateDoc.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(createAndUpdateDoc.fulfilled, (state) => {
        //     state.loading = false
        //     // state.docs = action.payload
        // })
        // .addCase(createAndUpdateDoc.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // })
        // .addCase(deleteDoc.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(deleteDoc.fulfilled, (state) => {
        //     state.loading = false
        //     // state.docs = action.payload
        // })
        // .addCase(deleteDoc.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // })
    },
})

export default exercisesSlice.reducer
