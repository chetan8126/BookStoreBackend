import express from 'express';
import Book from '../models/bookModel.js';

const router = express.Router();

router.post('/addbook',async(req,res)=>{
     const {title,author,genre,publishedDtae} = req.body;

     const newBook = new Book({ title,author,genre,publishedDtae});
     
    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
         res.status(400).json({message: "Book Couldnot be added",error: error.message});

    }
})

export default router;