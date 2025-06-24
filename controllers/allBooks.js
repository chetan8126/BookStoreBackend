import mongoose from 'mongoose';
import Book from '../models/bookModel.js';

const allBooks = async(req,res)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page-1)*limit;

        const books= await Book.find().skip(skip).limit(limit);

        const totalBook = await Book.countDocuments();

        const totalPages = Math.ceil(totalBook/limit);

        res.status(200).json({books,pagination :{
                currentpage: page, totalPages, totalBook
            }
        });
    }
    catch(error){
        res.status(500).json({message: "Error fetching the books", error: error.message})
    }
}

export default allBooks;