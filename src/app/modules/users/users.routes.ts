import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.getAllUsers);
router.get('/:id', UsersController.getSingleUser);

export const UsersRoutes = router;
