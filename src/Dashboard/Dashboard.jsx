import { useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import { useThemeMode } from "./Hooks/Theme";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const { theme, toggleTheme, resetTheme, hideSidebarAndHeader } = useThemeMode();
    const popupRef = useRef();
    const [popUp, setPopUp] = useState(false);
    const changeTheme = () => {
        setPopUp(!popUp);
        console.log(popUp);
    }

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'} h-screen overflow-hidden`}>
            <aside id="sidebar-multi-level-sidebar" className={` ${hideSidebarAndHeader ? 'hidden' : ''} fixed top-0 border-r left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0`} aria-label="Sidebar">
                <div className={`h-full px-3 py-4 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'}`}>
                    <ul className="space-y-2 font-medium">
                        <li className=''>
                            <Link to='/dashboard' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5  transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/add-new-dyeing-order' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="shrink-0 w-5 h-5  transition duration-75   "
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                <span className="ms-3">Add Dyeing Order</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/addnewsample' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="shrink-0 w-5 h-5 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M4 4c4 4 8 4 12 0" />
                                    <path d="M4 20c4-4 8-4 12 0" />
                                    <path d="M2 12h20" />
                                </svg>

                                <span className="ms-3">Add Sample Order</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/samples' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="shrink-0 w-5 h-5 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M4 4c4 4 8 4 12 0" />
                                    <path d="M4 20c4-4 8-4 12 0" />
                                    <path d="M2 12h20" />
                                </svg>

                                <span className="ms-3">All Samples Summary</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/raw-issue' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg
                                    className="shrink-0 w-5 h-5 transition duration-75"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                        <li>
                            <Link to='/dashboard/dyeing-order-wise-report' className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5  transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Dyeing Orders</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/summary' href="#" className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5  transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Summary</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/pi-summary' href="#" className="flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5  transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">PI Summary</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
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
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
