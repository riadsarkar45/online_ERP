import React from "react";

const notifications = [
    {
        id: 1,
        title: "New Friend Request",
        message: "John Doe sent you a friend request.",
        time: "2m ago",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        title: "New Message",
        message: "You have a new message from Jane.",
        time: "10m ago",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];

const AlertSidebar = ({ open, onClose }) => (
    <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
        }`}
    >
        <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
            >
                &times;
            </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-56px)]">
            {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">No notifications</div>
            ) : (
                notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
                    >
                        <img
                            src={notif.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="font-medium">{notif.title}</div>
                            <div className="text-sm text-gray-600">{notif.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default AlertSidebar;