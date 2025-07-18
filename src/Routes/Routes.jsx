import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import AddNewOrder from '../Dashboard/Pages/AddNewOrder.jsx';
import Orders from '../Dashboard/Pages/Orders.jsx';
import Production from '../Dashboard/Pages/Production.jsx';
import Summary from '../Dashboard/Pages/marketingSummary/Summary.jsx';
import PiSummary from '../Dashboard/Pages/PiSummary.jsx';
import AddRawIssue from '../Dashboard/Pages/rawIssue/AddRawIssue.jsx';
import AddNewSample from '../Dashboard/Pages/Sample/AddNewSample.jsx';
import AllSamples from '../Dashboard/Pages/Sample/AllSamples.jsx';
import SampleOrders from '../Dashboard/Pages/Sample/SampleOrders.jsx';
import AdminRoute from '../Dashboard/Hooks/AdminRoute/AdminRoute.jsx';
import PrivateRoute from '../Dashboard/Hooks/PrivateRoute.jsx';
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard",
                element: "Dashboard",
            },
            {
                path: "/dashboard/add-new-dyeing-order",
                element: <PrivateRoute> <AdminRoute><AddNewOrder /></AdminRoute></PrivateRoute>,
            },
            {
                path: "/dashboard/dyeing-order-wise-report",
                element: <PrivateRoute><Orders /></PrivateRoute>,
            },
            {
                path: "/dashboard/update-production-qty",
                element: <PrivateRoute><Production /></PrivateRoute>,
            },
            {
                path: "/dashboard/summary",
                element: <PrivateRoute><Summary /></PrivateRoute>,
            },
            {
                path: "/dashboard/pi-summary",
                element: <PrivateRoute><PiSummary /></PrivateRoute>,
            },
            {
                path: "/dashboard/raw-issue",
                element: <PrivateRoute><AddRawIssue /></PrivateRoute>,
            },
            {
                path: "/dashboard/addnewsample",
                element: <PrivateRoute><AdminRoute><AddNewSample /></AdminRoute></PrivateRoute>,
            },
            {
                path: "/dashboard/samples",
                element: <PrivateRoute><AllSamples /></PrivateRoute>,
            },
            {
                path: "/dashboard/all-samples",
                element: <PrivateRoute><SampleOrders /></PrivateRoute>,
            },
        ]
    },

]);
export default Routes;