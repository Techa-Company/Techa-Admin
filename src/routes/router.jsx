import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import OnlineClasses from '../pages/onlineClass/OnlineClasses';
import AddOnlineClass from '../pages/onlineClass/AddOnlineClass';
import AddMaster from '../pages/master/AddMaster';
import Students from '../pages/onlineClass/Students';
import Masters from '../pages/master/Masters';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/onlineClasses",
        element: <OnlineClasses />,
    },
    {
        path: "/onlineClasses/new",
        element: <AddOnlineClass />,
    },
    {
        path: "/onlineClasses/students",
        element: <Students />,
    },
    {
        path: "/masters",
        element: <Masters />,
    },
    {
        path: "/masters/new",
        element: <AddMaster />,
    },
]);
