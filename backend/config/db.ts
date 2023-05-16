import mongoose from 'mongoose';

export async function connectDb() {
    try {
        const conn = await mongoose.connect(<string>process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 