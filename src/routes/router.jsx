import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import Dashboard from '../pages/dashboard/Dashboard';
import Courses from '../pages/courses/Courses';
import AddCourse from '../pages/courses/AddCourse';
import EditCourse from '../pages/courses/EditCourse';
import Students from '../pages/students/Students';
import EditStudent from '../pages/students/EditStudent';
import StudentDetail from '../pages/students/StudentDetail';
import Categories from '../pages/course-categories/Categories';
import AddCategory from '../pages/course-categories/AddCategories';
import EditCategory from '../pages/course-categories/EditCategory';
import SubmittedExercises from '../pages/submitted-exercises/SubmittedExercises';
import CourseExercises from '../pages/course-exercises/CourseExercises';
import Tickets from '../pages/tickets/Tickets';
import TicketDetail from '../pages/tickets/TicketDetail';
import Purchases from '../pages/purchases/Purchases';
import PurchaseDetails from '../pages/purchases/PurchaseDetails';
import Quizzes from '../pages/quizzes/Quizzes';
import QuizDetails from '../pages/quizzes/QuizDetails';
import AddExercise from '../pages/course-exercises/AddExercise';
import EditExercise from '../pages/course-exercises/EditExercise';
import SubmittedExerciseDetail from '../pages/submitted-exercises/SubmittedExerciseDetail';
import SubmittedQuizzes from '../pages/submited-quizzes/SubmittedQuizzes';
import Certificates from '../pages/certificates/Certificates';
import Documents from '../pages/docs/Documents';
import DocumentDetails from '../pages/docs/DocumentDetails';
import AddDocument from '../pages/docs/AddDocument';
import EditDocument from '../pages/docs/EditDocument';
import Users from '../pages/users/Users';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/docs",
                element: <Documents />
            },
            {
                path: "/docs/new",
                element: <AddDocument />
            },
            {
                path: "/docs/:id",
                element: <DocumentDetails />
            },
            {
                path: "/docs/edit/:id",
                element: <EditDocument />
            },
            {
                path: "/courses",
                element: <Courses />
            },
            {
                path: "/courses/new",
                element: <AddCourse />
            },
            {
                path: "/courses/edit/:id",
                element: <EditCourse />
            },
            {
                path: "/courses/:id/exercises",
                element: <CourseExercises />
            },
            {
                path: "/courses/:id/exercises/:id",
                element: <EditCourse />
            },
            {
                path: "/courses/:id/exercises/new",
                element: <EditCourse />
            },
            {
                path: "/courses/:id/exercises/:id/edit",
                element: <EditCourse />
            },
            {
                path: "/course-categories",
                element: <Categories />
            },
            {
                path: "/course-categories/new",
                element: <AddCategory />
            },
            {
                path: "/course-categories/:id",
                element: <EditCategory />
            },
            {
                path: "/exercises/:id/submissions",
                element: <EditCategory />
            },
            {
                path: "/exercises/:id/submissions/:id",
                element: <EditCategory />
            },
            {
                path: "/course-categories/:id",
                element: <EditCategory />
            },

            {
                path: "/students",
                element: <Students />
            },
            {
                path: "/students/:id",
                element: <StudentDetail />
            },
            {
                path: "/students/edit/:id",
                element: <EditStudent />
            },
            {
                path: "/submitted-exercises",
                element: <SubmittedExercises />
            },
            {
                path: "/submitted-exercises/:id",
                element: <SubmittedExerciseDetail />
            },
            {
                path: "/submitted-quizzes",
                element: <SubmittedQuizzes />
            },
            {
                path: "/submitted-quizzes/:id",
                element: <SubmittedExerciseDetail />
            },
            {
                path: "/students/:id/exercises",
                element: <StudentDetail />
            },
            {
                path: "/students/:id/exercises/:id",
                element: <StudentDetail />
            },

            {
                path: "/users",
                element: <Users />
            },
            // {
            //     path: "/users/:id",
            //     element: <StudentDetail />
            // },
            // {
            //     path: "/users/edit/:id",
            //     element: <EditStudent />
            // },
            {
                path: "/purchases",
                element: <Purchases />
            },
            {
                path: "/purchases/:id",
                element: <PurchaseDetails />
            },
            {
                path: "/exercises",
                element: <CourseExercises />
            },
            {
                path: "/exercises/new",
                element: <AddExercise />
            },
            {
                path: "/exercises/:id/edit",
                element: <EditExercise />
            },
            {
                path: "/quizzes",
                element: <Quizzes />
            },
            {
                path: "/quizzes/:id",
                element: <QuizDetails />
            },
            {
                path: "/tickets",
                element: <Tickets />
            },
            {
                path: "/tickets/:id",
                element: <TicketDetail />
            },
            {
                path: "/certificates",
                element: <Certificates />
            },
        ]
    },

]);