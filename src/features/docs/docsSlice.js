// src/features/docs/docsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createDoc, fetchDocById, fetchDocContents, fetchDocs } from './docsActions'

const initialState = {
    docs: [],
    contents: [],
    singleDoc: null,
    loading: false,
    error: null,
}


const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDocs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDocs.fulfilled, (state, action) => {
                state.loading = false
                state.docs = action.payload
            })
            .addCase(fetchDocs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchDocById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDocById.fulfilled, (state, action) => {
                state.loading = false
                state.singleDoc = action.payload
            })
            .addCase(fetchDocById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createDoc.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createDoc.fulfilled, (state, action) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createDoc.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchDocContents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDocContents.fulfilled, (state, action) => {
                state.loading = false
                state.contents = action.payload
            })
            .addCase(fetchDocContents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default docsSlice.reducer
