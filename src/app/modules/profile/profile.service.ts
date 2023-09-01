import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUserReturn } from './profile.interface';

const getProfile = async (token: string): Promise<IUserReturn | null> => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = decodedToken;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not Found');
  }

  return result;
};

export const ProfileService = {
  getProfile,
};
