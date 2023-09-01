import express from 'express';

import { UserAuthRoutes } from '../modules/userAuth/userAuth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserAuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
