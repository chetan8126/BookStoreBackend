import express from 'express';
import Book from '../models/bookModel.js';
import mongoose from 'mongoose';

const router = express.Router();
router.get('/search/:id', async (req, res) => {
  try {
    // Extract the ID from the route parameter
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message:"Invalid Id,please check again"});
     }
    const currBook = await Book.findById(id); 
    if(!currBook)
    {
     res.status(404).json({ message:"Book not found"});
    }
    // Return the book in the response
    res.status(200).json({currBook});
  } catch(error){
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

router.get('/allbooks', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    // Optionally, add pagination to limit results per page
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch books with pagination
    const books = await Book.find().skip(skip).limit(limit);

    // Return the fetched books
    res.status(200).json({
      message: 'Books fetched successfully',
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Extract the ID and updated data from the request
    const { id } = req.params;
    const updatedBookData = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Attempt to find and update the book in the database
    const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true });

    // If the book was not found, return a 404 error
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return the updated book details
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    // Extract the ID from the URL parameter
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Attempt to find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(id);

    // If the book was not found, return a 404 error
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return a success message indicating the book has been deleted
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});


router.post('/addbook',async(req,res)=>{
     const {title,author,genre,publishedDate} = req.body;

     const newBook = new Book({ title,author,genre,publishedDate});
     
    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
         res.status(400).json({message: "Book Couldnot be added",error: error.message});

    }
})

export default router;