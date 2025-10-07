// src/features/docs/contentsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateContent, deleteContent, fetchContentById, fetchContents } from './contentsActions'

const initialState = {
    contents: [],
    singleContent: null,
    loading: false,
    error: null,
}


const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchContents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchContents.fulfilled, (state, action) => {
                state.loading = false
                state.contents = action.payload
            })
            .addCase(fetchContents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchContentById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchContentById.fulfilled, (state, action) => {
                state.loading = false
                state.singleContent = action.payload
            })
            .addCase(fetchContentById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateContent.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateContent.fulfilled, (state, action) => {
                state.loading = false
                // جایگزینی آیتم آپدیت شده در آرایه

            })
            .addCase(createAndUpdateContent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Delete Content
            .addCase(deleteContent.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteContent.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteContent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    },
})

export default contentsSlice.reducer
