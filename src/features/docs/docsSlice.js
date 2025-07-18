// src/features/docs/docsSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchDocContents, fetchDocs } from './docsActions'

const initialState = {
    docs: [],
    contents: [],
    loading: false,
    error: null,
}

const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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

        builder
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
