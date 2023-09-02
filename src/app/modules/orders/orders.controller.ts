import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';

//
const createNewOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const ordersData = req.body;
  const result = await OrderService.createNewOrder(ordersData, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const result = await OrderService.getAllOrders(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved  successfully!',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await OrderService.getSingleOrder(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched  successfully!',
    data: result,
  });
});

export const OrderController = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
};
