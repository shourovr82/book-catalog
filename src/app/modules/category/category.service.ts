import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createNewCategory = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};
const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });

  return result;
};
const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found !!');
  }

  return result;
};
const updateCategory = async (id: string, data: string) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found !!');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found !!');
  }

  const responseData = await prisma.$transaction(async transactionClient => {
    await transactionClient.book.deleteMany({
      where: {
        categoryId: id,
      },
    });

    const result = await transactionClient.category.delete({
      where: {
        id,
      },
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Update Course');
    }

    return result;
  });
  return responseData;
};

export const CategoriesService = {
  createNewCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
