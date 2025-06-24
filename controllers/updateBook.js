import mongoose from 'mongoose';
import Book from '../models/bookModel.js';

const updateBook = async (req,res)=>{
    try{
        const {id} = req.params;

        const updatedBookData = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({message: 'Invalid Book ID'});
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, {new:true});

        if(!updatedBook) res.status(404).json({message: 'Book Not found'});

        res.status(200).json(updatedBook,{message: "Book updated Successfully"});
    }
    catch(error){
        res.status(500).json({message: 'Error updating the book', error: error.message});
    }
}

export default updateBook;