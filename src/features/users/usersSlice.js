// src/features/users/usersSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './usersActions'

const initialState = {
    users: [],
    singleUser: null,
    loading: false,
    error: null,
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    },
})

export default usersSlice.reducer
