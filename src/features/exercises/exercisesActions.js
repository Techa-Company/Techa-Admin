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

// export const fetchDocById = createAsyncThunk(
//     'docs/fetchDocById',
//     async (parameters, thunkAPI) => {
//         try {
//             const res = await SP_fetch('Form_Courses', parameters)
//             console.log(res.Data.Dataset[0])
//             return res.Data.Dataset[0]
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.message)
//         }
//     }
// )

// export const createAndUpdateDoc = createAsyncThunk(
//     'docs/createAndUpdateDoc',
//     async (parameters, thunkAPI) => {
//         try {
//             const res = await SP_fetch('Save_Courses', parameters)
//             console.log(res)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message)
//         }
//     }
// )

// export const deleteDoc = createAsyncThunk(
//     'docs/deleteDoc',
//     async (parameters, thunkAPI) => {
//         try {
//             const res = await SP_fetch('Delete_Courses', parameters)
//             console.log(res)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message)
//         }
//     }
// )