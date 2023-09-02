export type IUserReturn = {
  id: string;
  name: string;
  role: string;
  email: string;
  contactNo: string;
  profileImg: string;
  address: string;
};
export type IUserLogin = {
  email: string;
  password: string;
};
export type IUserLoginResponse = {
  accessToken: string;
};
export type IBookFilterRequest = {
  search?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  category?: string | undefined;
};

export type IBookMyCoursesRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};

export type IBookRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};
