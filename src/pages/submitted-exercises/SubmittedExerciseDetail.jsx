import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Check, FileText, Code, Star } from 'lucide-react';
import Editor from '@monaco-editor/react';

const exerciseData = [
    {
        id: 1,
        title: "تمرین اول",
        exerciseNumber: 1,
        chapter: "مقدمات React",
        course: "آموزش مقدماتی React",
        status: "تکمیل شده",
        studentName: "علی رضایی",
        score: 18,
        problemStatement: `# تمرین شماره 1: ایجاد کامپوننت شمارنده

## توضیحات تمرین
یک کامپوننت شمارنده در React ایجاد کنید که دارای قابلیت‌های زیر باشد:
- نمایش مقدار فعلی شمارنده
- دکمه افزایش (+)
- دکمه کاهش (-)
- دکمه ریست به مقدار اولیه

## الزامات فنی
1. از هوک‌های React استفاده کنید
2. مقدار اولیه شمارنده باید 0 باشد
3. کامپوننت باید قابلیت استفاده مجدد داشته باشد
4. استایل‌دهی با استفاده از Tailwind CSS انجام شود

## نکات ارزیابی
- رعایت اصول کدنویسی تمیز
- عملکرد صحیح کامپوننت
- مدیریت state بهینه
- طراحی UI مناسب`,
        submittedCode: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">شمارنده: {count}</h2>
      <div className="flex space-x-3">
        <button 
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          افزایش
        </button>
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          کاهش
        </button>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          ریست
        </button>
      </div>
    </div>
  );
}

export default Counter;`,
        submissionDate: "۱۴۰۲/۰۳/۱۵ - ۱۴:۳۰"
    },
    {
        id: 2,
        title: "تمرین دوم",
        exerciseNumber: 2,
        chapter: "مقدمات React",
        course: "آموزش مقدماتی React",
        status: "در حال انجام",
        studentName: "زهرا حسینی",
        score: null,
        problemStatement: `# تمرین شماره 2: مدیریت فرم ورود

## توضیحات تمرین
یک فرم ورود با فیلدهای ایمیل و رمز عبور ایجاد کنید که دارای ویژگی‌های زیر باشد:
- اعتبارسنجی فیلدها
- نمایش پیام خطا در صورت ورودی نامعتبر
- دکمه ارسال فرم

## الزامات فنی
1. استفاده از react-hook-form برای مدیریت فرم
2. اعتبارسنجی ایمیل با regex
3. اعتبارسنجی رمز عبور (حداقل ۶ کاراکتر)
4. استایل‌دهی با Tailwind CSS`,
        submittedCode: `import React from 'react';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">فرم ورود</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">ایمیل</label>
        <input 
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('email', { 
            required: 'ایمیل الزامی است',
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
              message: 'ایمیل معتبر وارد کنید'
            }
          })}
        />
        {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">رمز عبور</label>
        <input 
          type="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('password', { 
            required: 'رمز عبور الزامی است',
            minLength: {
              value: 6,
              message: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
            }
          })}
        />
        {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
      </div>
      
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        ورود
      </button>
    </form>
  );
}

export default LoginForm;`,
        submissionDate: "۱۴۰۲/۰۳/۱۸ - ۱۰:۱۵"
    }
];

const SubmittedExerciseDetail = () => {
    const { id } = useParams();
    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const exercise = exerciseData.find(ex => ex.id === parseInt(id));

    if (!exercise) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">تمرین یافت نشد</h1>
                <Link to="/submitted-exercises">
                    <Button variant="primary">
                        بازگشت به لیست تمرینات
                    </Button>
                </Link>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (score && feedback) {
            // در اینجا معمولاً به API ارسال می‌شود
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/submitted-exercises" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    بازگشت به لیست تمرینات
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* هدر */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{exercise.title}</h1>
                            <div className="flex items-center space-x-3 mb-1">
                                <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                                    شماره تمرین: {exercise.exerciseNumber}
                                </span>
                                <span className="bg-indigo-500 text-xs px-2 py-1 rounded-full">
                                    {exercise.chapter}
                                </span>
                                <span className="bg-purple-500 text-xs px-2 py-1 rounded-full">
                                    {exercise.course}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${exercise.status === "تکمیل شده"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {exercise.status}
                            </span>
                            <p className="mt-2 text-sm">ارسال شده توسط: {exercise.studentName}</p>
                            <p className="text-sm opacity-90">تاریخ ارسال: {exercise.submissionDate}</p>
                        </div>
                    </div>
                </div>

                {/* محتویات اصلی */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* صورت تمرین */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <FileText className="h-5 w-5 text-blue-600 mr-2" />
                            <h2 className="text-xl font-bold">صورت تمرین</h2>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-[500px] overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-sans">
                                {exercise.problemStatement}
                            </pre>
                        </div>
                    </div>

                    {/* کد ارسال شده */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <Code className="h-5 w-5 text-blue-600 mr-2" />
                            <h2 className="text-xl font-bold">کد ارسال شده توسط دانشجو</h2>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden h-[500px]">
                            <Editor
                                height="100%"
                                language="javascript"
                                value={exercise.submittedCode}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* فرم ارزیابی */}
                <div className="border-t border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <h2 className="text-xl font-bold">ارزیابی تمرین</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium" htmlFor="score">
                                    نمره (از 20)
                                </label>
                                <div className="relative">
                                    <input
                                        id="score"
                                        type="number"
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="مثلاً 18.5"
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                        /20
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium" htmlFor="student-score">
                                    نمره فعلی دانشجو
                                </label>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                                    {exercise.score ? (
                                        <span className="text-lg font-bold text-blue-700">{exercise.score}</span>
                                    ) : (
                                        <span className="text-gray-500">هنوز نمره‌ای ثبت نشده</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-gray-700 mb-2 font-medium" htmlFor="feedback">
                                توضیحات و بازخورد
                            </label>
                            <textarea
                                id="feedback"
                                rows="4"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="نقاط قوت، ضعف و پیشنهادات خود را بنویسید..."
                            ></textarea>
                        </div>

                        <div className="mt-8">
                            <Button
                                type="submit"
                                className={`flex items-center ${isSubmitted ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                disabled={isSubmitted}
                            >
                                {isSubmitted ? (
                                    <>
                                        <Check className="h-5 w-5 mr-2" />
                                        نمره با موفقیت ثبت شد
                                    </>
                                ) : (
                                    'ثبت نمره و توضیحات'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmittedExerciseDetail;