import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Book from "./models/bookModel.js";
import dotenv from 'dotenv'; 
import bookRoutes from './routes/bookRoutes.js'
import errorHandler from './middleware/errorHandler.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/book', bookRoutes);
app.get('/',(req,res)=>{ 
    res.send("This is my first backend page");
})

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,(err)=>{
    if(err) console.log("Server couldnot run");
    console.log("My server is running fine");

  });
})
.catch((err)=>{
    console.log("Db couldnotbe connected",err);
})