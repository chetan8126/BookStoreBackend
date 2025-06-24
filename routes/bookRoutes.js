import express from 'express';
import addBook from '../controllers/addBook.js';
import allBooks from '../controllers/allBooks.js';
import getBookByID from '../controllers/getBookByID.js';
import updateBook from '../controllers/updateBook.js';
import deleteBook from '../controllers/deleteBook.js';

const router = express.Router();

router.get('/search/:id', getBookByID);

router.get('/allbooks', allBooks);

router.post('/addbook', addBook)

router.put('/search/:id', updateBook);

router.delete('/search/:id', deleteBook);

export default router;