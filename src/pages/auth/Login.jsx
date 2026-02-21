// src/pages/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authActions";

// کامپوننت‌های shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, User, Lock, Fingerprint } from "lucide-react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoading, error, isAuthenticated } = useSelector((s) => s.auth);

    const [credentials, setCredentials] = useState({
        UserName: "",
        Password: "",
        ProjectId: 1016,
    });

    useEffect(() => {
        if (isAuthenticated) {
            const from = (location.state)?.from?.pathname || "/";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location.state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    return (
        <div className="w-full min-h-screen grid lg:grid-cols-2 bg-white" dir="rtl">

            {/* ---------------- سمت راست: بخش فرم ورود ---------------- */}
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 relative">

                <div className="mx-auto w-full max-w-[400px] space-y-8 relative z-10">
                    {/* هدر فرم */}
                    <div className="space-y-3 text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-zinc-900 rounded-2xl shadow-xl shadow-zinc-900/20 ring-1 ring-zinc-900/10">
                                <Fingerprint className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-zinc-900">
                            ورود به پنل مدیریت
                        </h1>
                        <p className="text-sm text-zinc-500 font-medium">
                            جهت مدیریت سیستم، مشخصات کاربری خود را وارد کنید
                        </p>
                    </div>

                    {/* فرم */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-zinc-700 font-bold text-sm">نام کاربری</Label>
                            <div className="relative">
                                <User className="absolute right-3 top-3.5 h-5 w-5 text-zinc-400" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="admin"
                                    value={credentials.UserName}
                                    onChange={(e) => setCredentials({ ...credentials, UserName: e.target.value })}
                                    disabled={isLoading}
                                    required
                                    autoFocus
                                    className="h-12 pr-11 bg-white border-zinc-200 rounded-xl focus-visible:ring-zinc-900 focus-visible:border-zinc-900 transition-all text-base"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-700 font-bold text-sm">رمز عبور</Label>
                                <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                                    رمز را فراموش کردید؟
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute right-3 top-3.5 h-5 w-5 text-zinc-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={credentials.Password}
                                    onChange={(e) => setCredentials({ ...credentials, Password: e.target.value })}
                                    disabled={isLoading}
                                    required
                                    dir="ltr"
                                    className="h-12 pl-4 pr-11 bg-white border-zinc-200 rounded-xl focus-visible:ring-zinc-900 focus-visible:border-zinc-900 transition-all text-left text-lg tracking-widest font-mono"
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="bg-red-50 text-red-600 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 ml-2" />
                                <AlertDescription className="text-sm font-bold mt-0.5">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-base font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-lg shadow-zinc-900/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                                    در حال احراز هویت...
                                </>
                            ) : (
                                "ورود به حساب کاربری"
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* ---------------- سمت چپ: بخش بصری و برندینگ (فقط در دسکتاپ) ---------------- */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-zinc-900 text-white overflow-hidden">
                {/* تصویر پس‌زمینه (می‌تونی لینک عکس دلخواه خودت رو بذاری) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                    />
                    {/* گرادیانت روی عکس */}
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay"></div>
                </div>

                {/* لوگو یا نام برند (بالا چپ) */}
                <div className="relative z-10 flex items-center gap-2 font-black text-2xl tracking-tighter" dir="ltr">

                    <img src="/assets/images/logo-light.svg" className="w-44" alt="تکا" />
                </div>

                {/* نقل قول یا متن شعار (پایین) */}
                <div className="relative z-10 mt-auto">
                    <blockquote className="space-y-6">
                        <p className="text-2xl font-medium leading-relaxed text-zinc-100 drop-shadow-md">
                            "مدیریت قدرتمند نیازمند ابزارهای قدرتمند است. با این داشبورد، کنترل تمام بخش‌های سیستم در دستان شماست."
                        </p>
                        <footer className="text-sm text-zinc-400 font-medium">
                            توسعه یافته با ❤️ برای تیم مدیریت
                        </footer>
                    </blockquote>
                </div>
            </div>

        </div>
    );
}