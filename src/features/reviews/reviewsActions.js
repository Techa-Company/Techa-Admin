// src/features/todos/todosActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_DocReviews', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const fetchReviewById = createAsyncThunk(
    'reviews/fetchReviewById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_DocReviews', parameters)
            console.log(res.Data[0])
            return res.Data[0]
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
            console.log(res.Data[0])
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const changeReviewStatus = createAsyncThunk(
    'reviews/changeReviewStatus',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_DocReviews', parameters)
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
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)