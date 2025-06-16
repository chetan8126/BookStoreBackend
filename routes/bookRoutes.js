import express from 'express';
import Book from '../models/bookModel.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    // Get the page and limit query parameters, default to page 1 and limit 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of books to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch books with pagination
    const books = await Book.find().skip(skip).limit(limit);

    // Count the total number of books in the database
    const totalBooks = await Book.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBooks / limit);

    // Send response with books and pagination data
    res.status(200).json({
      books,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalBooks: totalBooks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

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