// utils/api.ts
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: "https://pool.techa.ir/api/ExecuteTSql",
    headers: { "Content-Type": "application/json" },
});

// -----------------------------
// Interceptor برای اضافه کردن توکن
// -----------------------------
api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use((response) => response,

    (error) => {
        // اگر خطا 401 بود
        if (error.response?.status === 401) {
            Cookies.remove("token");
            store.dispatch(logout());

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        // خطا را به promise reject برگردان تا catch معمولی کار کند
        return Promise.reject(error);
    }
);
// -----------------------------
// تابع اجرای Stored Procedure
// خروجی: Dataset + وضعیت درخواست
// -----------------------------
export async function SP_fetch(
    procedureName,
    parameters = {},
    hasDataTable = true
) {
    const body = {
        ProcedureName: procedureName,
        ProjectId: 1016,
        HasDataTable: hasDataTable,
        Parameters: Object.fromEntries(
            Object.entries(parameters).map(([k, v]) => [k.startsWith("@") ? k : `@${k}`, String(v)])
        ),
    };

    try {
        const { data } = await api.post("/ExecuteStoredProcedure", body);

        let dataset = [];
        if (typeof data.Data === "string") {
            try { dataset = JSON.parse(data.Data); } catch { }
        } else if (Array.isArray(data.Data)) {
            dataset = data.Data;
        }

        return {
            IsSuccess: data.IsSuccess ?? false,
            StatusCode: data.StatusCode ?? -1,
            Message: data.Message ?? "",
            Data: Array.isArray(dataset) ? dataset : [],
        };
    } catch (error) {
        return {
            IsSuccess: false,
            StatusCode: -1,
            Message: error instanceof Error ? error.message : "Unknown error",
            Data: [],
        };
    }
}

