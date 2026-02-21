// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, setAuthToken } from "../../services/authApi";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginUser(credentials);

            if (!response.IsSuccess)
                return rejectWithValue(response.Message || "ورود ناموفق بود");

            const { Token, ...user } = response.Data;
            setAuthToken(Token);

            return {
                user,
                token: Token,
            };
        } catch (err) {
            const message =
                err.response?.data?.Message ||
                err.message ||
                "خطا در ارتباط با سرور";

            return rejectWithValue(message);
        }
    }
);