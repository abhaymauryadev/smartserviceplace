import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;




let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { promise: null, mongoose: null };
}

export async function connectDB() {
    if (!MONGODB_URI) {
        throw new Error("Please provide a MONGODB_URI in the environment variables");
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

// Prevent multiple DB connections during hot reload
// Production-safe pattern
