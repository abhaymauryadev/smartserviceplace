import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["booking", "payment", "message", "system"],
            default: "system",
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
        },
        actionUrl: {
            type: String,
        },
        icon: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Notification ||
    mongoose.model("Notification", NotificationSchema);
