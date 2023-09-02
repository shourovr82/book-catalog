import express from 'express';
import { BooksController } from './book.controller';
const router = express.Router();

router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getSingleBook);
router.patch('/:id', BooksController.updateBook);
router.delete('/:id', BooksController.deleteBook);
router.get('/:categoryId/category', BooksController.getBookByCategory);
router.post('/create-book', BooksController.createNewBook);

export const BooksRoutes = router;
