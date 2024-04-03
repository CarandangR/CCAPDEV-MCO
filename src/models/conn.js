import mongoose from 'mongoose';
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI;

export function connectToMongo(dbName = process.env.DB_NAME) {
    return mongoose.connect(mongoURI, { dbName });
}

export function signalHandler() {
    console.log("Closing MongoDB connection...");
    mongoose.disconnect();
    process.exit();
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);