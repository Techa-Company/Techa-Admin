// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchUsers = createAsyncThunk(
    'docs/fetchUsers',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Users', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchDocById = createAsyncThunk(
    'docs/fetchDocById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Courses', parameters)
            console.log(res.Data[0])
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const createAndUpdateDoc = createAsyncThunk(
    'docs/createAndUpdateDoc',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Courses', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteDoc = createAsyncThunk(
    'docs/deleteDoc',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_Courses', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)