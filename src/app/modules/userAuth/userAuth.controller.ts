import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserAuthService } from './userAuth.service';

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserAuthService.createNewUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, studentFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await StudentService.getAllFromDB(filters, options);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Students fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await StudentService.getByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student fetched successfully',
//     data: result,
//   });
// });

// const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const result = await StudentService.updateIntoDB(id, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student updated successfully',
//     data: result,
//   });
// });
// const deleteStudent = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await StudentService.deleteStudent(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student deleted successfully',
//     data: result,
//   });
// });
export const UserAuthController = {
  createNewUser,
};
