import express from 'express';
import { UserAuthController } from './userAuth.controller';

const router = express.Router();

router.post('/signup', UserAuthController.createNewUser);

export const UserAuthRoutes = router;
