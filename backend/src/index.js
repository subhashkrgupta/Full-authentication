import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/authRouter.router.js';

dotenv.config();
const app = express()
app.use(express.json());

app.use(morgan('dev')); 

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.use('/api/v1', authRouter);


export default app;