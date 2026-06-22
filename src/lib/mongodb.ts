import mongoose from "mongoose";

// Cache connection across hot-reloads in dev & across invocations in Vercel serverless
const globalWithMongoose = global as typeof globalThis & {
    mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (globalWithMongoose.mongoose.conn) {
        return globalWithMongoose.mongoose.conn;
    }

    if (!globalWithMongoose.mongoose.promise) {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not set");
        }

        globalWithMongoose.mongoose.promise = mongoose.connect(MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        });
    }

    try {
        globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
        console.log("MongoDB connected successfully");
    } catch (error) {
        globalWithMongoose.mongoose.promise = null;
        console.error("MongoDB connection error:", error);
        throw error;
    }

    return globalWithMongoose.mongoose.conn;
};
