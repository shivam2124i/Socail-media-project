import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import { connectDb } from './config/db.js';
import postRouter from './routes/post.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';


dotenv.config({path :'./config/config.env'})

connectDb()
app.use(cors());

app.use(bodyParser.json({
    limit:'100mb',
    extended:true
}))
app.use(bodyParser.urlencoded({extended:false}))
   
app.use("/posts",postRouter);
app.use("/auth",authRouter);
app.use("/user",userRouter)

const port = process.env.PORT

 app.listen(port,() =>{
    console.log(`server is runing on http://localhost:${port}`.magenta.bold.underline);
}); 