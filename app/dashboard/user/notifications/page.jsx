"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/notifications?type=${activeTab}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAsRead" }),
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, status: "read" })));
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAsRead", ids: [id] }),
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, status: "read" } : n));
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "booking", label: "Bookings" },
    { id: "system", label: "System" },
  ];

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            ✓ Mark all as read
          </button>
          <button className="border p-2 rounded-lg hover:bg-gray-100">
            ⚙
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 text-sm sticky top-0 bg-gray-50 z-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-medium transition-colors ${activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white border rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔔</div>
            <p className="text-lg font-medium">No notifications yet</p>
            <p className="text-sm text-gray-400 mt-1">We'll notify you when something important happens.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-white border rounded-xl p-5 flex gap-4 transition-all ${notification.status === 'read' ? 'opacity-75 bg-gray-50/50' : 'hover:shadow-md border-l-4 border-l-blue-600'
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${notification.type === 'booking' ? 'bg-green-100' :
                  notification.type === 'payment' ? 'bg-yellow-100' :
                    notification.type === 'message' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                {notification.icon || (
                  notification.type === 'booking' ? '🏠' :
                    notification.type === 'payment' ? '💳' :
                      notification.type === 'message' ? '💬' : '🔔'
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-gray-900 truncate">{notification.title}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap pt-1">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>

                {notification.actionUrl && (
                  <button
                    onClick={() => {
                      markAsRead(notification._id);
                      window.location.href = notification.actionUrl;
                    }}
                    className="text-sm text-blue-600 mt-2 font-medium hover:underline focus:outline-none"
                  >
                    View Details
                  </button>
                )}
              </div>

              {notification.status === 'unread' && (
                <div className="flex flex-col justify-start pt-2">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" title="Unread" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

