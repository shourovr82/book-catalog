import express from 'express';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
