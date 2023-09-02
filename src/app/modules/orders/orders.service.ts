import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
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

  const result = await prisma.order.create({
    data: orderData,
  });

  return result;
};
const getAllOrders = async (token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token');
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });

  console.log(decodedToken);

  //
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not Exist');
  }

  let result = null;

  if (isUserExist && isUserExist?.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findMany({
      where: {
        userId: decodedToken.userId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    });
  }
  if (isUserExist && isUserExist?.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    });
  }

  if (!result?.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders Found !!');
  }

  return result;
};
const getSingleOrder = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
      userId: true,
      user: {
        select: {
          id: true,
          name: true,
          address: true,
          email: true,
          contactNo: true,
        },
      },
      orderedBooks: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found !!');
  }

  return result;
};

export const OrderService = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
};
