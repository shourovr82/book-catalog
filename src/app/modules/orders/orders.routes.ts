import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/create-order', OrderController.createNewOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:orderId', OrderController.getSingleOrder);

export const OrderRoutes = router;
