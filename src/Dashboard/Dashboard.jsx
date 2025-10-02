import { useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import { useThemeMode } from "./Hooks/Theme";
import { Toaster } from "react-hot-toast";
import UserRole from "./Hooks/UserRole";
import axiosPublic from "./Hooks/AxiosPublic";

const Dashboard = () => {
    const { theme, toggleTheme, resetTheme, hideSidebarAndHeader } = useThemeMode();
    const [usersRole] = UserRole();
    // console.log(usersRole);
    const popupRef = useRef();
    const [popUp, setPopUp] = useState(false);
    const changeTheme = () => {
        setPopUp(!popUp);
        console.log(popUp);
    }

    const callFastifyApi = () => {
        axiosPublic.post('http://localhost:3000/api/v1/refresh-token', {}, {
            withCredentials: true // 👈 This tells Axios to send cookies like refreshToken
        }).then(response => {
            console.log('Response:', response.data);
        }).catch(err => {
            console.error('Error:', err.response?.data || err.message);
        });
    };


    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'} h-screen overflow-hidden`}>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen border-r overflow-y-auto bg-white text-black dark:bg-gray-900 dark:text-gray-100 transition-transform sm:translate-x-0 -translate-x-full"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="w-5 h-5 transition duration-75"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        {/* Dyeing & Sample Dropdown */}
                        <li className="group">
                            <button
                                type="button"
                                className="flex w-full items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="w-5 h-5 transition duration-75"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4 4h16v16H4z" />
                                </svg>
                                <span className="ms-3 flex-1 text-left">Dyeing & Sample</span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <ul className="hidden group-hover:flex flex-col pl-6 mt-1 space-y-1">
                                <li>
                                    <Link
                                        to="/dashboard/add-new-dyeing-order"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Add Dyeing Order
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/addnewsample"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Add Sample Order
                                    </Link>
                                    <Link
                                        to="/dashboard/all-samples"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        All Samples
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/samples"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Sample Summary
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Reports Dropdown */}
                        <li className="group">
                            <button
                                type="button"
                                className="flex w-full items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="w-5 h-5 transition duration-75"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 6h18M3 12h18M3 18h18" />
                                </svg>
                                <span className="ms-3 flex-1 text-left">Reports</span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <ul className="hidden group-hover:flex flex-col pl-6 mt-1 space-y-1">
                                <li>
                                    <Link
                                        to="/dashboard/dyeing-order-wise-report"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Dyeing Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/summary"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Summary
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/pi-summary"
                                        className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        PI Summary
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Other links */}
                        <li>
                            <Link
                                to="/dashboard/raw-issue"
                                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="w-5 h-5 transition duration-75"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12" y2="16.01" />
                                </svg>
                                <span className="ms-3">Enter Raw Issue</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className={`h-full pl-64 md:pl-64 flex flex-col `}>
                <header className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'} ${hideSidebarAndHeader ? 'hidden' : ''} fixed border-b top-0 left-64 right-0 h-16 shadow flex items-center justify-between px-4 z-30`}>
                    <div className="text-sm"></div>
                    <h1 onClick={() => changeTheme()} className="text-xl font-semibold w-[3rem] h-[3rem] flex items-center justify-center rounded-lg bg-red-500">T</h1>

                    {popUp && (
                        <div
                            ref={popupRef}
                            className={`${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-black'} absolute top-14 right-0 w-64 p-2  rounded-lg shadow-lg z-50`}
                        >
                            <h2 className="text-md font-bold  border-b p-2">Theme</h2>
                            <p className="border-p border-b flex items-center  p-2">
                                {
                                    theme === 'light' ? (
                                        <span onClick={() => toggleTheme()} className="flex cursor-pointer items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 000 14 9 9 0 009.79-4.21z" />
                                            </svg>

                                            Dark
                                        </span>
                                    ) : <span onClick={() => toggleTheme()} className="flex cursor-pointer gap-2 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-10h1M3.34 12h1m14.14 6.36l-.7-.7M6.36 6.36l-.7-.7m12.02 0l-.7.7M6.36 17.64l-.7.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
                                        </svg>
                                        Light
                                    </span>
                                }

                            </p>
                            <p className="border-p border-b flex items-center  p-2">
                                <span onClick={() => resetTheme()} className="flex gap-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-black dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2a9 9 0 11-2.21-5.663L20 9M4.582 9A9.003 9.003 0 0112 3c2.21 0 4.208.804 5.729 2.127" />
                                    </svg>
                                    <h2>Reset</h2>
                                </span>

                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => alert("Logged out")}
                            >
                                <span className="flex gap-3">

                                    Log Out
                                </span>
                            </button>
                        </div>
                    )}
                </header>
                <main className="mt-16 overflow-y-auto p-6 h-full">
                    <Outlet />
                    <Toaster />

                    <button onClick={callFastifyApi}> Call fastify api </button>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
