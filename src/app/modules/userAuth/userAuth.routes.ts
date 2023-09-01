import express from 'express';
import { UserAuthController } from './userAuth.controller';

const router = express.Router();

router.post('/signup', UserAuthController.createNewUser);
router.post('/login', UserAuthController.userLogin);

export const UserAuthRoutes = router;
