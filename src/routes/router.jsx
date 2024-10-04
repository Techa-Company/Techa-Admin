import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import OnlineClasses from '../pages/onlineClass/OnlineClasses';
import AddOnlineClass from '../pages/onlineClass/AddOnlineClass';

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
]);
