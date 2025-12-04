// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchContents = createAsyncThunk(
    'docs/fetchContents',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Contents', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const fetchContentsForDropdown = createAsyncThunk(
    'docs/fetchContentsForDropdown',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Contents_Dropdown', parameters)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchContentById = createAsyncThunk(
    'docs/fetchContentById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Contents', parameters)
            console.log(res.Data[0])
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const createAndUpdateContent = createAsyncThunk(
    'docs/createAndUpdateContent',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Contents', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const deleteContent = createAsyncThunk(
    'docs/deleteContent',
    async (parameters, thunkAPI) => {

        console.log(parameters)
        try {
            const res = await SP_fetch('Delete_Contents', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)