import express from 'express';

import { CategoriesRoutes } from '../modules/category/category.routes';
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
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
