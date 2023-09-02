import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

type OrderBook = {
  bookId: string;
  quantity: number;
};

type IOrderRequest = {
  orderedBooks: OrderBook[];
};

const createNewOrder = async (data: IOrderRequest, token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token');
  }

  const orderData = {
    userId: decodedToken.userId,
    ...data,
  };

  console.log(orderData);

  const result = await prisma.order.create({
    data: orderData,
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

const deleteCategory = async (id: string) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found !!');
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const OrderService = {
  createNewOrder,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
