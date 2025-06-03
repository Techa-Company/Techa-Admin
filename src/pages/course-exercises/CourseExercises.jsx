import React, { useMemo, useState } from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Link, useNavigate } from 'react-router-dom';

const exercises = [
    {
        "id": 1,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 2,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 3,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 4,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 5,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 6,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 7,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 8,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 9,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 10,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 11,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 12,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 13,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 14,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 15,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 16,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 17,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 18,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 19,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 20,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 21,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 22,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 23,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 24,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 25,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 26,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 27,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 28,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 29,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 30,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 31,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 32,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 33,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 34,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 35,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 36,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 37,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 38,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 39,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 40,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 41,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 42,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 43,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 44,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 45,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 46,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 47,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 48,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 49,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 50,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 51,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 52,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 53,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 54,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 55,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 56,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 57,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 58,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 59,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 60,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 61,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 62,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 63,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 64,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 65,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 66,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 67,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 68,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 69,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 70,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 71,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 72,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 73,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 74,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 75,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 76,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 77,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 78,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 79,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 80,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 81,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 82,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 83,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 84,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 85,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 86,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 87,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 88,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 89,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 90,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 91,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 92,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 93,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 94,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 95,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 96,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 97,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 98,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 99,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 100,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 101,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 102,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 103,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 104,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 105,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 106,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 107,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 108,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 109,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 110,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 111,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 112,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 113,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 114,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 115,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 116,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 117,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 118,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 119,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 120,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 121,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 122,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 123,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 124,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 125,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 126,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 127,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 128,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 129,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 130,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 131,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 132,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 133,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 134,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 135,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 136,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 137,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 138,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 139,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 140,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 141,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 142,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 143,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 144,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 145,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 146,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 147,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 148,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 149,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 150,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 151,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 152,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 153,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 154,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 155,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 156,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 157,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 158,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 159,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 160,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 161,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 162,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 163,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 164,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 165,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 166,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 167,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 168,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 169,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 170,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 171,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 172,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 173,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 174,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 175,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 176,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 177,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 178,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 179,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 180,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 181,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 182,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 183,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 184,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 185,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 186,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 187,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 188,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 189,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 190,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 191,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 192,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 193,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 194,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 195,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 196,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 197,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 198,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 199,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 200,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 201,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 202,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 203,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 204,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 205,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 206,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 207,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 208,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 209,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 210,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 211,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 212,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 213,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 214,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 215,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 216,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 217,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 218,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 219,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 220,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 221,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 222,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 223,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 224,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 225,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 226,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 227,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 228,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 229,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 230,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 231,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 232,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 233,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 234,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 235,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 236,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 237,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 238,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 239,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 240,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 241,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 242,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 243,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 244,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 245,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 246,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 247,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 248,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 249,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 250,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 251,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 252,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 253,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 254,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 255,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 256,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 257,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 258,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 259,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 260,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 261,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 262,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 263,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 264,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 265,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 266,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 267,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 268,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 269,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 270,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 271,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 272,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 273,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 274,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 275,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 276,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 277,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 278,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 279,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 280,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 281,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 282,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 283,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 284,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 285,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 286,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 287,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 288,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 289,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 290,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 291,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 292,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 293,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 294,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 295,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 296,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 297,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 298,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 299,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 300,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 301,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 302,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 303,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 304,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 305,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 306,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 307,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 308,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 309,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 310,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 311,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 312,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 313,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 314,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 315,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 316,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 317,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 318,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 319,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 320,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 321,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 322,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 323,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 324,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 325,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 326,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 327,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 328,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 329,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 330,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 331,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 332,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 333,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 334,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 335,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 336,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 337,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 338,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 339,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 340,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 341,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 342,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 343,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 344,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 345,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 346,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 347,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 348,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 349,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 350,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 351,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 352,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 353,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 354,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 355,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 356,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 357,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 358,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 359,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 360,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 361,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 362,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 363,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 364,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 365,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 366,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 367,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 368,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 369,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 370,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 371,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 372,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 373,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 374,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 375,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 376,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 377,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 378,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 379,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 380,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 381,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 382,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 383,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 384,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 385,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 386,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 387,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 388,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 389,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 390,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 391,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 392,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 393,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 394,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 395,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 396,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 397,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 398,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 399,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 400,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 401,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 402,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 403,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 404,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 405,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 406,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 407,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 408,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 409,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 410,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 411,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 412,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 413,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 414,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 415,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 416,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 417,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 418,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 419,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 420,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 421,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 422,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 423,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 424,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 425,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 426,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 427,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 428,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 429,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 430,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 431,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 432,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 433,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 434,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 435,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 436,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 437,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 438,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 439,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 440,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 441,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 442,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 443,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 444,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 445,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 446,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 447,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 448,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 449,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 450,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 451,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 452,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 453,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 454,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 455,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 456,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 457,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 458,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 459,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 460,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 461,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 462,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 463,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 464,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 465,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 466,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 467,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 468,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 469,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 470,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 471,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 472,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 473,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 474,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 475,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 476,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 477,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 478,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 479,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 480,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 481,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 482,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 483,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 484,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 485,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 486,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 487,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 488,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 489,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 490,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 491,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 492,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 493,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 494,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 495,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 496,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 497,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 498,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 499,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 500,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 501,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 502,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 503,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 504,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 505,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 506,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 507,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 508,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 509,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 510,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 511,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 512,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 513,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 514,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 515,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 516,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 517,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 518,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 519,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 520,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 521,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 522,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 523,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 524,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 525,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 526,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 527,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 528,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 529,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 530,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 531,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 532,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 533,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 534,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 535,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 536,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 537,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 538,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 539,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 540,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 541,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 542,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 543,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 544,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 545,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 546,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 547,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 548,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 549,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 550,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 551,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 552,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 553,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 554,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 555,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 556,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 557,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 558,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 559,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 560,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 561,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 562,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 563,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 564,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 565,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 566,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 567,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 568,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 569,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 570,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 571,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 572,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 573,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 574,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 575,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 576,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 577,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 578,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 579,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 580,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 581,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 582,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 583,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 584,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 585,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 586,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 587,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 588,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 589,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 590,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 591,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 592,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 593,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 594,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 595,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 596,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 597,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 598,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 599,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 600,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 601,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 602,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 603,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 604,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 605,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 606,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 607,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 608,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 609,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 610,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 611,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 612,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 613,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 614,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 615,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 616,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 617,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 618,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 619,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 620,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 621,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 622,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 623,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 624,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 625,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 626,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 627,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 628,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 629,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 630,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 631,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 632,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 633,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 634,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 635,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 636,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 637,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 638,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 639,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 640,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 641,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 642,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 643,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 644,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 645,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 646,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 647,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 648,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 649,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 650,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 651,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 652,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 653,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 654,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 655,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 656,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 657,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 658,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 659,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 660,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 661,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 662,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 663,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 664,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 665,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 666,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 667,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 668,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 669,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 670,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 671,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 672,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 673,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 674,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 675,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 676,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 677,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 678,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 679,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 680,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 681,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 682,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 683,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 684,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 685,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 686,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 687,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 688,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 689,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 690,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 691,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 692,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 693,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 694,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 695,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 696,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 697,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 698,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 699,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 700,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 701,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 702,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 703,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 704,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 705,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 706,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 707,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 708,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 709,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 710,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 711,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 712,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 713,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 714,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 715,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 716,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 717,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 718,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 719,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 720,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 721,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 722,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 723,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 724,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 725,
        "number": 3,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 726,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 727,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 728,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 729,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 730,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 731,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 732,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 733,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 734,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 735,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 736,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 737,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 738,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 739,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 740,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 741,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 742,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 743,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 744,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 745,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 746,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 747,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 748,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 749,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 750,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 751,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 752,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 753,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 754,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 755,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 756,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 757,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 758,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 759,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 760,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 761,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 762,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 763,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 764,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 765,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 766,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 767,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 768,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 769,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 770,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 771,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 772,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 773,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 774,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 775,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 776,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 777,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 778,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 779,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 780,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 781,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 782,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 783,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 784,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 785,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 786,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 787,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 788,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 789,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 790,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 791,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 792,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 793,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 794,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 795,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 796,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 797,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 798,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 799,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 800,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 801,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "مقدمه بر JSX",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 802,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "قواعد JSX",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 803,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 804,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "مبانی JSX",
        "session": "کار با عناصر",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 805,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 806,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "کامپوننت‌های تابعی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 807,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 808,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "پراپس‌ها و State",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 809,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 810,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "کامپوننت‌ها",
        "session": "چرخه عمر",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 811,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "مسیریابی ساده",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 812,
        "number": 1,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 813,
        "number": 2,
        "course": "React مقدماتی",
        "chapter": "روتر",
        "session": "لینک‌ها و پارامترها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 814,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 815,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 816,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "درک Scope",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 817,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Closure و Scope",
        "session": "مثال‌های کاربردی Closure",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 818,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Promises",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 819,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 820,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Async/Await",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 821,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 822,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 823,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "Async Programming",
        "session": "Error Handling",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 824,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 825,
        "number": 2,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 826,
        "number": 3,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Arrow Functions",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 827,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Modules",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 828,
        "number": 1,
        "course": "JavaScript پیشرفته",
        "chapter": "ES6+",
        "session": "Destructuring",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 829,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "اصول طراحی خوب",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 830,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 831,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 832,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "مبانی طراحی",
        "session": "الگوهای طراحی",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 833,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 834,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 835,
        "number": 3,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "فونت‌ها و خوانایی",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 836,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "تایپوگرافی",
        "session": "تنظیمات متنی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 837,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 838,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "روانشناسی رنگ",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 839,
        "number": 1,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 840,
        "number": 2,
        "course": "طراحی رابط کاربری",
        "chapter": "رنگ‌ها",
        "session": "ترکیب رنگی",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 841,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 842,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 843,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "مسیریابی با Express",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 844,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 845,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 846,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "Middleware چیست؟",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 847,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "Express",
        "session": "خطایابی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 848,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 849,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 850,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "خواندن فایل",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 851,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 852,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "نوشتن فایل",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 853,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 854,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 855,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "کار با فایل‌ها",
        "session": "جریان‌ها",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 856,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 857,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 858,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "MongoDB اتصال",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 859,
        "number": 1,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 860,
        "number": 2,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 861,
        "number": 3,
        "course": "NodeJS پیشرفته",
        "chapter": "پایگاه داده",
        "session": "مدلسازی داده",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 862,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 863,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 864,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "ساخت مخزن",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 865,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "مبانی Git",
        "session": "انجام Commit",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 866,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 867,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 868,
        "number": 3,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "Branch و Merge",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 869,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 870,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "شاخه‌بندی",
        "session": "حل تعارض",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 871,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Pull Request",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 872,
        "number": 1,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 873,
        "number": 2,
        "course": "Git و GitHub",
        "chapter": "کار تیمی",
        "session": "Code Review",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 874,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 875,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "HTML مقدماتی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 876,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 877,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 878,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "CSS و Flexbox",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 879,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 880,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 881,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "مقدمه وب",
        "session": "Grid Layout",
        "level": "سخت",
        "status": "منتشر شده"
    },
    {
        "id": 882,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 883,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "متوسط",
        "status": "پیش‌نویس"
    },
    {
        "id": 884,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "آشنایی با MongoDB",
        "level": "سخت",
        "status": "پیش‌نویس"
    },
    {
        "id": 885,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 886,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 887,
        "number": 3,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "طراحی دیتابیس",
        "level": "متوسط",
        "status": "منتشر شده"
    },
    {
        "id": 888,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 889,
        "number": 2,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "پایگاه داده",
        "session": "کوئری‌نویسی",
        "level": "آسان",
        "status": "پیش‌نویس"
    },
    {
        "id": 890,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "ساخت API",
        "level": "آسان",
        "status": "منتشر شده"
    },
    {
        "id": 891,
        "number": 1,
        "course": "بوت‌کمپ فول‌استک",
        "chapter": "Backend با Node",
        "session": "JWT و احراز هویت",
        "level": "آسان",
        "status": "پیش‌نویس"
    }
];

const CourseExercises = () => {
    const navigate = useNavigate();

    const [courseFilter, setCourseFilter] = useState('');
    const [chapterFilter, setChapterFilter] = useState('');
    const [sessionFilter, setSessionFilter] = useState('');

    const filteredData = useMemo(() => {
        return exercises.filter((item) =>
            (!courseFilter || item.course === courseFilter) &&
            (!chapterFilter || item.chapter === chapterFilter) &&
            (!sessionFilter || item.session === sessionFilter)
        );
    }, [courseFilter, chapterFilter, sessionFilter]);

    const courseList = [...new Set(exercises.map((item) => item.course))];

    const chapterList = useMemo(() => {
        return courseFilter
            ? [...new Set(exercises.filter((e) => e.course === courseFilter).map((e) => e.chapter))]
            : [];
    }, [courseFilter]);

    const sessionList = useMemo(() => {
        return chapterFilter
            ? [...new Set(exercises.filter((e) => e.chapter === chapterFilter).map((e) => e.session))]
            : [];
    }, [chapterFilter]);

    const columns = [
        {
            accessorKey: 'id',
            header: 'ردیف',
            cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
        },
        {
            accessorKey: 'number',
            header: 'شماره تمرین',
            cell: ({ row }) => <div className="text-center">{row.getValue('number')}</div>,
        },
        {
            accessorKey: 'course',
            header: 'دوره',
            cell: ({ row }) => <div className="text-center">{row.getValue('course')}</div>,
        },
        {
            accessorKey: 'chapter',
            header: 'فصل',
            cell: ({ row }) => <div className="text-center">{row.getValue('chapter')}</div>,
        },
        {
            accessorKey: 'session',
            header: 'جلسه',
            cell: ({ row }) => <div className="text-center">{row.getValue('session')}</div>,
        },
        {
            accessorKey: 'level',
            header: 'سطح',
            cell: ({ row }) => <div className="text-center">{row.getValue('level')}</div>,
        },
        {
            accessorKey: 'status',
            header: 'وضعیت',
            cell: ({ row }) => {
                const status = row.getValue('status');
                return (
                    <span className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${status === 'منتشر شده' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: 'عملیات',
            cell: ({ row }) => {
                const course = row.original;
                return (
                    <div className="flex justify-center items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 flex items-center justify-center">
                                    <span className="sr-only">باز کردن منو</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(course.title)}>
                                    کپی عنوان
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={`/courses/${course.id}/exercises`}>تمرینات</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={`${course.id}/edit`}>ویرایش</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            }

        },
    ];

    return (
        <>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">لیست تمرین‌ها</h1>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('new')}>
                    ایجاد تمرین
                </Button>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
                {/* Select course */}
                <Select onValueChange={(val) => {
                    setCourseFilter(val);
                    setChapterFilter('');
                    setSessionFilter('');
                }}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب دوره" />
                    </SelectTrigger>
                    <SelectContent>
                        {courseList.map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Select chapter */}
                <Select
                    disabled={!courseFilter}
                    onValueChange={(val) => {
                        setChapterFilter(val);
                        setSessionFilter('');
                    }}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب فصل" />
                    </SelectTrigger>
                    <SelectContent>
                        {chapterList.map((chapter) => (
                            <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Select session */}
                <Select
                    disabled={!chapterFilter}
                    onValueChange={(val) => setSessionFilter(val)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب جلسه" />
                    </SelectTrigger>
                    <SelectContent>
                        {sessionList.map((session) => (
                            <SelectItem key={session} value={session}>{session}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <DataTable data={filteredData} columns={columns} filters={[]} />
        </>
    );
};

export default CourseExercises;
