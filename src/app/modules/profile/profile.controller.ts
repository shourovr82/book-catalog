import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const result = await ProfileService.getProfile(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved in successfully!',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
