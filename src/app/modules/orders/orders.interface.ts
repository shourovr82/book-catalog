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
export type OrderBook = {
  bookId: string;
  quantity: number;
};

export type IOrderRequest = {
  orderedBooks: OrderBook[];
};
