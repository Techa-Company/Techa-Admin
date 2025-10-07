import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const sampleExams = [
    {
        id: 1,
        title: "آزمون نهایی React",
        courseTitle: "دوره جامع React",
        type: "تستی",
        questionCount: 20,
        duration: 30,
        status: "فعال",
        description: "این آزمون جهت ارزیابی نهایی دانشجویان طراحی شده است و شامل سوالات تستی و کدنویسی است.",
        createdAt: "1403/02/15",
        questions: [
            {
                id: 1,
                text: "کدام هوک برای مدیریت state در کامپوننت‌های تابعی استفاده می‌شود؟",
                type: "multiple-choice",
                options: ["useEffect", "useState", "useContext", "useReducer"],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "خروجی کد زیر چیست؟\n\n```jsx\nconsole.log(2 + '2' - 1);\n```",
                type: "code",
                codeLanguage: "javascript",
                correctAnswer: "21"
            },
            {
                id: 3,
                text: "کدام متد برای رندر لیست‌ها در React استفاده می‌شود؟",
                type: "multiple-choice",
                options: ["map()", "forEach()", "filter()", "reduce()"],
                correctAnswer: 0
            }
        ]
    },
    {
        id: 2,
        title: "آزمون مقدماتی HTML",
        courseTitle: "HTML مقدماتی",
        type: "تستی",
        questionCount: 10,
        duration: 15,
        status: "غیرفعال",
        description: "مناسب برای سنجش مقدماتی دانشجویان دوره HTML.",
        createdAt: "1403/01/20",
        questions: [
            {
                id: 1,
                text: "تگ صحیح برای ایجاد لینک کدام است؟",
                type: "multiple-choice",
                options: ["<a>", "<link>", "<href>", "<url>"],
                correctAnswer: 0
            }
        ]
    }
];

const statusColor = {
    فعال: 'bg-green-100 text-green-800',
    غیرفعال: 'bg-gray-200 text-gray-700',
};

const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
];

const QuizDetails = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [exam, setExam] = useState(null);
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        type: 'multiple-choice',
        options: ['', ''],
        correctAnswer: 0,
        codeLanguage: 'javascript'
    });

    useEffect(() => {
        const foundExam = sampleExams.find(e => e.id === parseInt(id));
        if (foundExam) {
            setExam({ ...foundExam });
        }
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveExam = () => {
        // در اینجا منطق ذخیره در API قرار می‌گیرد
        console.log('آزمون ذخیره شد:', exam);
        setIsEditing(false);
    };

    const handleQuestionChange = (questionId, field, value) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        }));
    };

    const handleOptionChange = (questionId, optionIndex, value) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = value;
                    return { ...q, options: newOptions };
                }
                return q;
            })
        }));
    };

    const addOption = (questionId) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? { ...q, options: [...q.options, ''] } : q
            )
        }));
    };

    const removeOption = (questionId, optionIndex) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId) {
                    const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
                    let newCorrectAnswer = q.correctAnswer;

                    if (optionIndex === q.correctAnswer) {
                        newCorrectAnswer = 0;
                    } else if (optionIndex < q.correctAnswer) {
                        newCorrectAnswer = q.correctAnswer - 1;
                    }

                    return { ...q, options: newOptions, correctAnswer: newCorrectAnswer };
                }
                return q;
            })
        }));
    };

    const addNewQuestion = () => {
        if (!newQuestion.text.trim()) return;

        const question = {
            id: exam.questions.length + 1,
            text: newQuestion.text,
            type: newQuestion.type,
            options: newQuestion.type === 'multiple-choice'
                ? [...newQuestion.options]
                : [],
            correctAnswer: newQuestion.correctAnswer,
            codeLanguage: newQuestion.codeLanguage
        };

        setExam(prev => ({
            ...prev,
            questions: [...prev.questions, question],
            questionCount: prev.questions.length + 1
        }));

        setNewQuestion({
            text: '',
            type: 'multiple-choice',
            options: ['', ''],
            correctAnswer: 0,
            codeLanguage: 'javascript'
        });
    };

    const removeQuestion = (questionId) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId),
            questionCount: prev.questions.length - 1
        }));
    };

    if (!exam) return <p className="text-center py-10">آزمون یافت نشد.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <Card className="shadow-xl">
                <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditing ? (
                                <Input
                                    value={exam.title}
                                    onChange={e => setExam({ ...exam, title: e.target.value })}
                                    className="text-xl font-bold w-full"
                                />
                            ) : exam.title}
                        </h1>

                        <Badge className={`px-3 py-1 text-sm ${statusColor[exam.status]}`}>
                            {exam.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <Label>عنوان دوره:</Label>
                            {isEditing ? (
                                <Input
                                    value={exam.courseTitle}
                                    onChange={e => setExam({ ...exam, courseTitle: e.target.value })}
                                />
                            ) : (
                                <p className="font-medium">{exam.courseTitle}</p>
                            )}
                        </div>

                        <div>
                            <Label>نوع آزمون:</Label>
                            {isEditing ? (
                                <Select
                                    value={exam.type}
                                    onValueChange={value => setExam({ ...exam, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="نوع آزمون" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="تستی">تستی</SelectItem>
                                        <SelectItem value="تشریحی">تشریحی</SelectItem>
                                        <SelectItem value="ترکیبی">ترکیبی</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>{exam.type}</p>
                            )}
                        </div>

                        <div>
                            <Label>تعداد سوالات:</Label>
                            <p className="font-medium">{exam.questions.length}</p>
                        </div>

                        <div>
                            <Label>مدت پاسخ‌گویی (دقیقه):</Label>
                            {isEditing ? (
                                <Input
                                    type="number"
                                    value={exam.duration}
                                    onChange={e => setExam({ ...exam, duration: parseInt(e.target.value) || 0 })}
                                />
                            ) : (
                                <p>{exam.duration}</p>
                            )}
                        </div>

                        <div>
                            <Label>تاریخ ایجاد:</Label>
                            <p>{exam.createdAt}</p>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <Label>توضیحات آزمون:</Label>
                        {isEditing ? (
                            <Textarea
                                value={exam.description}
                                onChange={e => setExam({ ...exam, description: e.target.value })}
                                rows={3}
                                className="mt-2"
                            />
                        ) : (
                            <p className="text-gray-800 leading-relaxed mt-2">{exam.description}</p>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-8">
                        <h2 className="text-xl font-bold text-gray-800">
                            سوالات آزمون
                            {isEditing && (
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({exam.questions.length} سوال)
                                </span>
                            )}
                        </h2>

                        {exam.questions.map((question, index) => (
                            <div key={question.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-medium flex items-center">
                                        <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                            {index + 1}
                                        </span>
                                        سوال
                                    </h3>

                                    {isEditing && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeQuestion(question.id)}
                                        >
                                            حذف سوال
                                        </Button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-4">
                                        <Textarea
                                            value={question.text}
                                            onChange={e => handleQuestionChange(question.id, 'text', e.target.value)}
                                            placeholder="متن سوال"
                                            rows={3}
                                        />

                                        <div>
                                            <Label>نوع سوال:</Label>
                                            <Select
                                                value={question.type}
                                                onValueChange={value => handleQuestionChange(question.id, 'type', value)}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="نوع سوال" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="multiple-choice">چند گزینه‌ای</SelectItem>
                                                    <SelectItem value="code">کدنویسی</SelectItem>
                                                    <SelectItem value="descriptive">تشریحی</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {question.type === 'multiple-choice' && (
                                            <div className="space-y-3">
                                                <Label>گزینه‌ها:</Label>
                                                {question.options.map((option, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2">
                                                        <Input
                                                            value={option}
                                                            onChange={e => handleOptionChange(question.id, idx, e.target.value)}
                                                            placeholder={`گزینه ${idx + 1}`}
                                                        />
                                                        <input
                                                            type="radio"
                                                            name={`correct-${question.id}`}
                                                            checked={idx === question.correctAnswer}
                                                            onChange={() => handleQuestionChange(question.id, 'correctAnswer', idx)}
                                                            className="h-4 w-4 text-blue-600"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeOption(question.id, idx)}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addOption(question.id)}
                                                >
                                                    + افزودن گزینه
                                                </Button>
                                            </div>
                                        )}

                                        {question.type === 'code' && (
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>زبان برنامه‌نویسی:</Label>
                                                    <Select
                                                        value={question.codeLanguage || 'javascript'}
                                                        onValueChange={value => handleQuestionChange(question.id, 'codeLanguage', value)}
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="زبان" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {languageOptions.map(lang => (
                                                                <SelectItem key={lang.value} value={lang.value}>
                                                                    {lang.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label>پاسخ صحیح:</Label>
                                                    <Input
                                                        value={question.correctAnswer}
                                                        onChange={e => handleQuestionChange(question.id, 'correctAnswer', e.target.value)}
                                                        placeholder="پاسخ صحیح"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="whitespace-pre-line">{question.text}</p>

                                        {question.type === 'multiple-choice' && (
                                            <div className="space-y-2 mt-3">
                                                {question.options.map((option, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`p-3 border rounded-md ${idx === question.correctAnswer
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'border-gray-200'
                                                            }`}
                                                    >
                                                        <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {question.type === 'code' && question.text.includes('```') && (
                                            <div className="mt-3">
                                                <SyntaxHighlighter
                                                    language={question.codeLanguage || 'javascript'}
                                                    style={atomOneDark}
                                                    customStyle={{ borderRadius: '0.5rem', fontSize: '0.9rem' }}
                                                    showLineNumbers
                                                >
                                                    {question.text.split('```')[1].trim()}
                                                </SyntaxHighlighter>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isEditing && (
                            <div className="border-2 border-dashed rounded-lg p-6 bg-gray-50">
                                <h3 className="font-medium mb-4">اضافه کردن سوال جدید</h3>

                                <div className="space-y-4">
                                    <Textarea
                                        value={newQuestion.text}
                                        onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                        placeholder="متن سوال جدید"
                                        rows={3}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>نوع سوال:</Label>
                                            <Select
                                                value={newQuestion.type}
                                                onValueChange={value => setNewQuestion({ ...newQuestion, type: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="نوع سوال" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="multiple-choice">چند گزینه‌ای</SelectItem>
                                                    <SelectItem value="code">کدنویسی</SelectItem>
                                                    <SelectItem value="descriptive">تشریحی</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {newQuestion.type === 'code' && (
                                            <div>
                                                <Label>زبان برنامه‌نویسی:</Label>
                                                <Select
                                                    value={newQuestion.codeLanguage}
                                                    onValueChange={value => setNewQuestion({ ...newQuestion, codeLanguage: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="زبان" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {languageOptions.map(lang => (
                                                            <SelectItem key={lang.value} value={lang.value}>
                                                                {lang.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>

                                    {newQuestion.type === 'multiple-choice' && (
                                        <div className="space-y-3">
                                            <Label>گزینه‌ها:</Label>
                                            {newQuestion.options.map((option, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <Input
                                                        value={option}
                                                        onChange={e => {
                                                            const newOptions = [...newQuestion.options];
                                                            newOptions[idx] = e.target.value;
                                                            setNewQuestion({ ...newQuestion, options: newOptions });
                                                        }}
                                                        placeholder={`گزینه ${idx + 1}`}
                                                    />
                                                    <input
                                                        type="radio"
                                                        name="new-correct"
                                                        checked={idx === newQuestion.correctAnswer}
                                                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: idx })}
                                                        className="h-4 w-4 text-blue-600"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newOptions = newQuestion.options.filter((_, i) => i !== idx);
                                                            setNewQuestion({
                                                                ...newQuestion,
                                                                options: newOptions,
                                                                correctAnswer: idx === newQuestion.correctAnswer ? 0 : newQuestion.correctAnswer
                                                            });
                                                        }}
                                                    >
                                                        حذف
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setNewQuestion({
                                                    ...newQuestion,
                                                    options: [...newQuestion.options, '']
                                                })}
                                            >
                                                + افزودن گزینه
                                            </Button>
                                        </div>
                                    )}

                                    <Button
                                        className="mt-2"
                                        onClick={addNewQuestion}
                                    >
                                        افزودن سوال جدید
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={handleEditToggle}>
                                    انصراف
                                </Button>
                                <Button onClick={handleSaveExam}>
                                    ذخیره تغییرات
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={handleEditToggle}>
                                    ویرایش آزمون
                                </Button>
                                <Button variant="destructive">
                                    حذف آزمون
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizDetails;