import React, { useEffect, useState } from "react";
import { Check, BookOpen, Circle, ArrowRight, User, FileText, Award, MessageSquare } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Shadcn Components
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { Skeleton } from "../../components/ui/skeleton";
import { Label } from "../../components/ui/label";

// Redux Actions
import { fetchSubmittedExerciseById, fetchSubmittedExercises, sendExercise } from "../../features/exercises/exercisesActions";

const SubmittedExerciseDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singleSubmittedExercise: exercise, loading } = useSelector(state => state.exercises);
    console.log(exercise)
    const [score, setScore] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchSubmittedExerciseById({ "@Id": params.id }));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (exercise) {
            setScore(exercise?.UserScore ?? "");
            setFeedback(exercise?.UserFeedback ?? "");
        }
    }, [exercise, params.id]);

    const handleSubmit = async () => {
        if (!exercise) return;
        setSubmitting(true);

        // تعیین وضعیت بر اساس نمره
        let status = 2; // پیش‌فرض
        if (score !== "") {
            const numScore = parseFloat(score);
            if (numScore < 70) status = 4;
            else if (numScore >= 70 && numScore <= 100) status = 3;
        }

        const data = {
            "@Id": exercise.UserExerciseProgId,
            "@UserId": "5",
            "@ExerciseId": exercise.Id,
            "@Score": score || 0,
            "@Feedback": feedback || "",
            "@Status": status
        };
        console.log(data)

        try {
            await dispatch(sendExercise(data)).unwrap();
            toast.success("تمرین با موفقیت ذخیره شد");
            dispatch(fetchSubmittedExercises());
            navigate("/submitted-exercises");
        } catch (error) {
            console.log("Error sending exercise:", error);
            toast.error("خطا در ذخیره تمرین: " + (error?.message || "خطای ناشناخته"));
        } finally {
            setSubmitting(false);
        }
    };

    const renderStatusBadge = (status) => {
        const statusConfig = {
            2: { label: "در انتظار بررسی", variant: "secondary", icon: BookOpen },
            3: { label: "تایید شده", variant: "default", icon: Check },
            4: { label: "نیازمند اصلاح", variant: "destructive", icon: Circle },
        };

        const config = statusConfig[status] || { label: "نامشخص", variant: "outline", icon: Circle };
        const IconComponent = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1 py-1">
                <IconComponent className="w-3 h-3" />
                {config.label}
            </Badge>
        );
    };

    const getLevelBadge = (level) => {
        const levels = {
            1: { label: "آسان", variant: "default" },
            2: { label: "متوسط", variant: "secondary" },
            3: { label: "دشوار", variant: "destructive" },
            4: { label: "چالش‌برانگیز", variant: "outline" }
        };

        const levelConfig = levels[level] || levels[1];
        return <Badge variant={levelConfig.variant}>{levelConfig.label}</Badge>;
    };

    if (loading || !exercise) {
        return (
            <div className="container mx-auto p-6 max-w-4xl space-y-6">
                <Skeleton className="h-8 w-64" />
                <div className="grid gap-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* هدر صفحه */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">بررسی تمرین ارسالی</h1>
                    <p className="text-muted-foreground mt-2">
                        بررسی و ارزیابی پاسخ ارسالی توسط کاربر
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/submitted-exercises")}
                    className="flex items-center gap-2"
                >
                    <ArrowRight className="w-4 h-4" />
                    بازگشت به لیست
                </Button>
            </div>

            <Separator />

            <div className="grid items-start grid-cols-2 gap-6">
                {/* کارت اطلاعات تمرین */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <CardTitle>اطلاعات تمرین</CardTitle>
                        </div>
                        <CardDescription>جزئیات کامل تمرین و مشخصات دوره</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">عنوان تمرین</Label>
                                    <p className="font-semibold mt-1">{exercise.Title}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">توضیحات</Label>
                                    <p className="text-sm mt-1 text-muted-foreground">
                                        {exercise.Description || "بدون توضیحات"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">دوره</Label>
                                        <p className="font-medium mt-1">{exercise.CourseTitle}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">فصل</Label>
                                        <p className="font-medium mt-1">{exercise.SessionTitle}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">جلسه</Label>
                                        <p className="font-medium mt-1">{exercise.ChapterTitle}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">سطح</Label>
                                        <div className="mt-1">
                                            {getLevelBadge(exercise.Level)}
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">وضعیت</Label>
                                        <div className="mt-1">
                                            <Badge variant={exercise.Disabled ? "destructive" : "default"}>
                                                {exercise.Disabled ? "غیرفعال" : "فعال"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* کارت اطلاعات کاربر و پاسخ */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-green-500" />
                            <CardTitle>پاسخ کاربر</CardTitle>
                        </div>
                        <CardDescription>پاسخ ارسالی و وضعیت فعلی کاربر</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">وضعیت فعلی:</span>
                            {renderStatusBadge(exercise.UserStatus)}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">پاسخ ارسالی کاربر</Label>
                            <div className="p-4 bg-muted/30 rounded-lg border">
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {exercise.UserAnswer || "پاسخی ثبت نشده است"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* کارت ارزیابی و فیدبک */}
                <Card className="col-span-2">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            <CardTitle>ارزیابی و فیدبک</CardTitle>
                        </div>
                        <CardDescription>ثبت نمره و ارائه بازخورد به کاربر</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="evaluation" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="evaluation" className="flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    ارزیابی
                                </TabsTrigger>
                                <TabsTrigger value="preview" className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    پیش‌نمایش
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="evaluation" className="space-y-4 pt-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="score" className="flex items-center gap-2">
                                            <Award className="w-4 h-4" />
                                            نمره کاربر
                                        </Label>
                                        <Input
                                            id="score"
                                            type="number"
                                            value={score}
                                            onChange={(e) => setScore(e.target.value)}
                                            placeholder="عدد بین ۰ تا ۱۰۰"
                                            min="0"
                                            max="100"
                                            className="text-left"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            نمره باید بین ۰ تا ۱۰۰ باشد
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-amber-600">
                                                {score || "۰"}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                نمره نهایی
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="feedback" className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        بازخورد به کاربر
                                    </Label>
                                    <Textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="نظرات، پیشنهادات و راهنمایی‌های خود را برای کاربر بنویسید..."
                                        className="min-h-[120px] resize-vertical"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {feedback.length} کاراکتر
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="preview" className="space-y-4 pt-4">
                                <div className="p-4 border rounded-lg space-y-4">
                                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                                        <div className="text-2xl font-bold text-amber-600 mb-2">
                                            {score || "تعیین نشده"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">نمره نهایی کاربر</div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">بازخورد شما:</h4>
                                        <div className="p-3 bg-muted/30 rounded-lg min-h-[100px]">
                                            {feedback ? (
                                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                                    {feedback}
                                                </p>
                                            ) : (
                                                <p className="text-muted-foreground text-sm">
                                                    بازخوردی نوشته نشده است
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <strong>وضعیت جدید:</strong> {renderStatusBadge(
                                                    score ? (parseFloat(score) < 70 ? 4 : 3) : 2
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between border-t pt-6">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/submitted-exercises")}
                            className="w-full sm:w-auto"
                        >
                            انصراف
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                        >
                            {submitting ? (
                                <>
                                    <Circle className="w-4 h-4 animate-spin mr-2" />
                                    در حال ذخیره...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    ذخیره ارزیابی
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div >
    );
};

export default SubmittedExerciseDetail;