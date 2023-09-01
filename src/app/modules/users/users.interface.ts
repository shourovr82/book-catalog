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

export type IUsersFilterRequest = {
  searchTerm?: string | undefined;
  academicFacultyId?: string | undefined;
  academicDepartmentId?: string | undefined;
  academicSemesterId?: string | undefined;
  studentId?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  gender?: string | undefined;
  bloodGroup?: string | undefined;
};
