import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "../features/auth/authSlice";
import { store } from "../store/store";

const authApi = axios.create({
    baseURL: "https://pool.techa.ir/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});


authApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            // اینجا معمولاً کمتر پیش می‌آید چون لاگین تازه است
            // ولی اگر خواستی می‌توانی همان logout را بزن
            Cookies.remove("token");
            store.dispatch(logout());
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export async function loginUser(credentials) {
    const response = await authApi.post("/Account/Login", credentials);
    return response.data;
}

export function setAuthToken(token) {
    if (token) {
        Cookies.set("token", token, {
            expires: 7,
            secure: import.meta.env.PROD,
            sameSite: "strict",
        });
    } else {
        Cookies.remove("token");
    }
}