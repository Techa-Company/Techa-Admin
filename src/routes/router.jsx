import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import Dashboard from '../pages/dashboard/Dashboard';
import Courses from '../pages/courses/Courses';
import AddCourse from '../pages/courses/AddCourse';
import EditCourse from '../pages/courses/EditCourse';
import Students from '../pages/students/Students';
import EditStudent from '../pages/students/EditStudent';

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
                path: "/students",
                element: <Students />
            },
            {
                path: "/students/edit/:id",
                element: <EditStudent />
            },
        ]
    },

]);