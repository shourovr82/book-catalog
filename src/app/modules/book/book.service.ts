import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createNewBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};
const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  return result;
};
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !!');
  }

  return result;
};
const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const isBookExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !!');
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};
const deleteBook = async (id: string): Promise<Book | null> => {
  const isBookExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !!');
  }

  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BooksService = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
