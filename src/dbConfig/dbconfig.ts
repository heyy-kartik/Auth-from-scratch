import mongoose from 'mongoose';

export default async function connectToDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        console.log("Database connected successfully");
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}