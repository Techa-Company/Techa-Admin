// src/features/docs/exercisesSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SP_fetch } from '../../services/api'


export const fetchExercises = createAsyncThunk(
    'docs/fetchExercises',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Exercises', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const fetchSubmittedExercises = createAsyncThunk(
    'docs/fetchSubmittedExercises',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Submitted_Exercise_List', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const fetchSubmittedExerciseById = createAsyncThunk(
    'docs/fetchSubmittedExerciseById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Submitted_Exercise_Details', parameters)
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
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

const initialState = {
    exercises: [],
    submittedExercises: [],
    singleExercise: null,
    singleSubmittedExercise: null,
    loading: false,
    error: null,
}


const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchExercises.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.loading = false
                state.exercises = action.payload
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSubmittedExercises.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubmittedExercises.fulfilled, (state, action) => {
                state.loading = false
                state.submittedExercises = action.payload
            })
            .addCase(fetchSubmittedExercises.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchExerciseById.fulfilled, (state, action) => {
                state.loading = false
                state.singleExercise = action.payload
            })
            .addCase(fetchExerciseById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSubmittedExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubmittedExerciseById.fulfilled, (state, action) => {
                state.loading = false
                state.singleSubmittedExercise = action.payload
            })
            .addCase(fetchSubmittedExerciseById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateExercise.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateExercise.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateExercise.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteExercise.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteExercise.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(deleteExercise.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default exercisesSlice.reducer
