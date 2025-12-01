// src/features/docs/docsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateDoc, deleteDoc, fetchDocById, fetchDocs, fetchDocsForDropdown } from './docsActions'

const initialState = {
    docs: [],
    dropdown: [],
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
            .addCase(fetchDocsForDropdown.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDocsForDropdown.fulfilled, (state, action) => {
                state.loading = false
                state.dropdown = action.payload
            })
            .addCase(fetchDocsForDropdown.rejected, (state, action) => {
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
            .addCase(createAndUpdateDoc.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateDoc.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateDoc.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteDoc.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteDoc.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(deleteDoc.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default docsSlice.reducer
