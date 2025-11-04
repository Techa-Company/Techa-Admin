// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchExercises = createAsyncThunk(
    'docs/fetchExercises',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Exercises', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchExerciseById = createAsyncThunk(
    'docs/fetchExerciseById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Exercises', parameters)
            console.log(res.Data.Dataset[0])
            return res.Data.Dataset[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const createAndUpdateExercise = createAsyncThunk(
    'docs/createAndUpdateExercise',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Exercises', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteExercise = createAsyncThunk(
    'docs/deleteExercise',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_Exercises', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const sendExercise = createAsyncThunk(
    'docs/sendExercise',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_UserExerciseProgresses', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)