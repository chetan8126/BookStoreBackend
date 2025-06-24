import mongoose from 'mongoose';
import Book from '../models/bookModel.js';

const getBookByID = async (req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {res.status(400).json({message: "Invalid Id, please check again"});}

        const currBook = await Book.findById(id);

        if(!currBook)
        {res.status(404).json({message:"Book not found"});}

        res.status(200).json({currBook});
    }
    catch(error){
        res.status(500).json({message: "Error fetching the book", error: error.message})
    }
}

export default getBookByID;