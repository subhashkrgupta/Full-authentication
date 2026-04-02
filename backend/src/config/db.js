import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        if(!process.env.DATABASE_URL){
            console.error('DATABASE_URL is not defined');
            process.exit(1);
        }
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;