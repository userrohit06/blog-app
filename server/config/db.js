import mongoose from 'mongoose'

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI

    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log(`Connected to Mongodb: ${connect.connection.host}`);
        return connect.connection.host
    } catch (error) {
        console.log(`Error while connecting to mongodb: ${error.message}`);
        return error.message
    }
}