// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Questions', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const fetchQuestionById = createAsyncThunk(
    'questions/fetchQuestionById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Questions', parameters)
            console.log(res.Data[0])
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const changeQuestionStatus = createAsyncThunk(
    'questions/changeQuestionStatus',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Questions', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)