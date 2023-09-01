import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get('/', ProfileController.getProfile);

export const ProfileRoutes = router;
