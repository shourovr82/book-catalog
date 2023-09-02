import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { booksFilterableFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

const createNewBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};
const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];
  const orConditions = [];
  if (search || maxPrice || minPrice) {
    if (search) {
      orConditions.push({
        OR: booksFilterableFields.map(field => ({
          [field]: {
            contains: search,
            mode: 'insensitive',
          },
        })),
      });
    }

    if (maxPrice) {
      const maxPriceFloat = parseFloat(maxPrice);
      if (!isNaN(maxPriceFloat)) {
        orConditions.push({
          OR: [{ price: { lte: maxPriceFloat } }],
        });
      }
    }

    if (minPrice) {
      const minPriceFloat = parseFloat(minPrice);

      if (!isNaN(minPriceFloat)) {
        orConditions.push({
          OR: [{ price: { gte: minPriceFloat } }],
        });
      }
    }
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          categoryId: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  let whereConditions: Prisma.BookWhereInput = {};

  if (andConditions.length > 0 && orConditions.length > 0) {
    whereConditions = {
      AND: andConditions,
      OR: orConditions,
    };
  } else if (andConditions.length > 0) {
    whereConditions = {
      AND: andConditions,
    };
  } else if (orConditions.length > 0) {
    whereConditions = {
      OR: orConditions,
    };
  }

  const result = await prisma.book.findMany({
    include: {
      category: true,
      reviewAndRatings: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
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
const getBookByCategory = async (
  categoryId: string
): Promise<Book[] | null> => {
  const isExistCategory = await prisma.category.findMany({});

  if (!isExistCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Not Exist');
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Book Not Found on this category !!'
    );
  }

  return result;
};
export const BooksService = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBookByCategory,
};
