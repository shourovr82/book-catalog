import prisma from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      orders: true,
      reviewAndRatings: true,
    },
  });

  return result;
};
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      orders: true,
      reviewAndRatings: true,
    },
  });

  return result;
};
export const UsersService = {
  getAllUsers,
  getSingleUser,
};
