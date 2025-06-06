import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import AddNewOrder from '../Dashboard/Pages/AddNewOrder.jsx';
import Orders from '../Dashboard/Pages/Orders.jsx';
import Production from '../Dashboard/Pages/Production.jsx';
import Summary from '../Dashboard/Pages/marketingSummary/Summary.jsx';
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
            }
        ]
    },

]);
export default Routes;