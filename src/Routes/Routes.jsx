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
                element: <AddNewOrder />,
            },
            {
                path: "/dashboard/dyeing-order-wise-report",
                element: <Orders />,
            },
            {
                path: "/dashboard/update-production-qty",
                element: <Production />,
            },
            {
                path: "/dashboard/summary",
                element: <Summary />,
            },
            {
                path: "/dashboard/pi-summary",
                element: <PiSummary />,
            },
            {
                path: "/dashboard/raw-issue",
                element: <AddRawIssue />,
            },
            {
                path: "/dashboard/addnewsample",
                element: <AddNewSample />,
            },
            {
                path: "/dashboard/samples",
                element: <AllSamples />,
            }
        ]
    },

]);
export default Routes;