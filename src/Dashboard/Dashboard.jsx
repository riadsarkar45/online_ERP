import { useState } from "react";
import { Link, Outlet } from "react-router";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-200 ease-in-out 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 text-black">
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <button onClick={() => setSidebarOpen(false)}>X</button>
                    </div>
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="block hover:text-gray-500">Dashboard</Link>
                        <Link to="/dashboard/add-new-dyeing-order" className="block hover:text-gray-500">Add New Dyeing Order</Link>
                        <Link to="/dashboard/dyeing-order-wise-report" className="block hover:text-gray-500">Dyeing Order Wise Report</Link>
                        <Link to="/dashboard/summary" className="block hover:text-gray-500">Bulk Summary</Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="h-full pl-64 md:pl-64 flex flex-col">
                {/* Header */}
                <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-30 md:left-64">
                    <button className="md:hidden" onClick={() => setSidebarOpen(true)}>MENU</button>
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                </header>

                {/* Scrollable Content */}
                <main className="mt-16 overflow-y-auto p-6 h-full">
                    <Outlet />
                    {/* Or example content below */}
                    
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
