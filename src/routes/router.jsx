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
                path: "/course-categories",
                element: <Categories />
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
        ]
    },

]);