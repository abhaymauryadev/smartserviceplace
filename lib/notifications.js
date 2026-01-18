import Notification from "@/models/Notification";
import { connectDB } from "./db";

/**
 * Create a new notification for a user.
 * @param {Object} data - Notification data.
 * @param {string} data.user - User ID to receive the notification.
 * @param {string} data.title - Title of the notification.
 * @param {string} data.message - Message content.
 * @param {string} [data.type='system'] - Type of notification ('booking', 'payment', 'message', 'system').
 * @param {string} [data.actionUrl] - URL to redirect to when clicked.
 * @param {string} [data.icon] - Icon emoji or path.
 */
export async function createNotification({ user, title, message, type = "system", actionUrl, icon }) {
    try {
        await connectDB();
        const notification = await Notification.create({
            user,
            title,
            message,
            type,
            actionUrl,
            icon,
        });
        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
        return null;
    }
}
