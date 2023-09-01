import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoriesService } from './category.service';

//
const createNewCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.createNewCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched  successfully!',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await CategoriesService.getSingleCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched  successfully!',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const data = req.body;
  const result = await CategoriesService.updateCategory(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully!',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await CategoriesService.deleteCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted successfully!',
    data: result,
  });
});

export const CategoryController = {
  createNewCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
