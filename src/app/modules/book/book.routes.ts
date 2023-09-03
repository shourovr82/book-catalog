import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BooksController } from './book.controller';
const router = express.Router();

router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getSingleBook);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.deleteBook);
router.get('/:categoryId/category', BooksController.getBookByCategory);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.createNewBook
);

export const BooksRoutes = router;
