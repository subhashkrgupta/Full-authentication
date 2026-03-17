import connectDB from "./config/db.js";
import app from "./index.js";



const serverStart =async ()=>{
    try {
        await connectDB();
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
}
serverStart();