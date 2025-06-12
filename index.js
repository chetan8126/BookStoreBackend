import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Book from "./models/bookModel.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.get('/',(req,res)=>{ 
    res.send("This is my first backend page");
})
app.post('/addbook',async (req,res)=>{
    const {title,author,genre,publishedDtae} = req.body;
    const newBook = new Book({ title,author,genre,publishedDtae});
    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch{
         res.status(400).json({message: "Book Couldnot be added",error: error.message});

    }
})

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,(err)=>{
    if(err) console.log("Server couldnot run");
    console.log("My server is running fine");
})
})
.catch(()=>{
    console.log("Db couldnotbe connected");
})