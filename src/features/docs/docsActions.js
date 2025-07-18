// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchDocs = createAsyncThunk(
    'docs/fetchDocs',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Courses', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchDocContents = createAsyncThunk(
    'docs/fetchDocContents',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Contents', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)