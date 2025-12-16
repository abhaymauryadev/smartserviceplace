import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI){
    throw new Error("Please provide a MONGODB_URI in the environment variables")
}


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { promise: null, mongoose: null };
}

export async function connectDB(){
    if (cached.conn) return cached.conn;

   if(!cached.promise){
    cached.promsise = mongoose.connect(MONGODB_URI, {
        bufferCommand: true,
    });
   }

   cached.conn = await cached.promise;
   return cached.conn;
}

// Prevent multiple DB connections during hot reload
// Production-safe pattern
