import express from 'express';

import { BooksRoutes } from '../modules/book/book.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { UserAuthRoutes } from '../modules/userAuth/userAuth.routes';
import { UsersRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserAuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/books',
    route: BooksRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
