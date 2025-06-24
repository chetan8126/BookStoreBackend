import Book from '../models/bookModel.js';

const deleteBook = async (req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) 
        {
            res.status(400).json({message:"Invalid Book ID"});
        }

        const deletedBook = await Books.findByIdAndDelete(id);

        if(!deletedBook)
        {res.status(404).json({message: 'Book Not Found'})};

        res.status(200).json({message:'Book Deleted Successfully'});
    }
    catch(error){
        res.status(500).json({message: "Error Deleting the Book", error: error.message});
    }
}

export default deleteBook;