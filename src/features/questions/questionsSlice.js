// src/features/docs/questionsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { changeQuestionStatus, fetchQuestionById, fetchQuestions } from './questionsActions'

const initialState = {
    questions: [],
    singleQuestion: null,
    loading: false,
    error: null,
}


const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false
                state.questions = action.payload
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchQuestionById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchQuestionById.fulfilled, (state, action) => {
                state.loading = false
                state.singleQuestion = action.payload
            })
            .addCase(fetchQuestionById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(changeQuestionStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(changeQuestionStatus.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(changeQuestionStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default questionsSlice.reducer
