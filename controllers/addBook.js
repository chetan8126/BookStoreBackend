import mongoose from 'mongoose';
import Book from '../models/bookModel.js';

const addBook = async (req,res)=>{
    const {title,author,genre,publishedDate} = req.body;
    
    if (!title || !author || !genre || !publishedDate) {
    return res.status(400).json({
      message: 'All fields are required: title, author, genre, publishedDate',
    });
  }

    const newBook = new Book ({title,author,genre,publishedDate});

    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book Couldnot be added",error: error.message});
    }
}

export default addBook;