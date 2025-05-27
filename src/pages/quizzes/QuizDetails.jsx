import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const sampleExams = [
    {
        id: 1,
        title: "آزمون نهایی React",
        courseTitle: "دوره جامع React",
        type: "تستی",
        questionCount: 20,
        duration: 30,
        status: "فعال",
        description: "این آزمون جهت ارزیابی نهایی دانشجویان طراحی شده است و شامل سوالات تستی است.",
        createdAt: "1403/02/15",
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
    },
];

const statusColor = {
    فعال: 'bg-green-100 text-green-800',
    غیرفعال: 'bg-gray-200 text-gray-700',
};

const QuizDetails = () => {
    const { id } = useParams();
    const exam = sampleExams.find((e) => e.id === parseInt(id));

    if (!exam) return <p>آزمون یافت نشد.</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Card className="shadow-lg">
                <CardContent className="p-6 space-y-5">
                    <h1 className="text-2xl font-bold">{exam.title}</h1>

                    <div className="space-y-3 text-gray-700 text-sm">
                        <div className="flex justify-between">
                            <span>عنوان دوره:</span>
                            <span className="font-medium">{exam.courseTitle}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>نوع آزمون:</span>
                            <span>{exam.type}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>تعداد سوالات:</span>
                            <span>{exam.questionCount}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>مدت پاسخ‌گویی:</span>
                            <span>{exam.duration} دقیقه</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>وضعیت:</span>
                            <Badge className={statusColor[exam.status]}>{exam.status}</Badge>
                        </div>

                        <div className="flex justify-between">
                            <span>تاریخ ایجاد:</span>
                            <span>{exam.createdAt}</span>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h2 className="font-semibold mb-2">توضیحات آزمون:</h2>
                        <p className="text-gray-800 leading-relaxed">{exam.description}</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline">ویرایش آزمون</Button>
                        <Button variant="destructive">حذف آزمون</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizDetails;
