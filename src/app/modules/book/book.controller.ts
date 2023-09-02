import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IBookFilterRequest } from './book.interface';
import { BooksService } from './book.service';

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.createNewBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully successfully!',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters: IBookFilterRequest = pick(req.query, [
    'search',
    'minPrice',
    'maxPrice',
    'category',
  ]);

  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const result = await BooksService.getAllBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully!',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await BooksService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully!',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const data = req.body;
  const result = await BooksService.updateBook(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully!',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await BooksService.deleteBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is deleted successfully!',
    data: result,
  });
});
const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params?.categoryId;
  const result = await BooksService.getBookByCategory(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});
export const BooksController = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBookByCategory,
};
