import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/create-order', OrderController.createNewOrder);
// router.get('/', CategoryController.getAllCategories);
// router.get('/:id', CategoryController.getSingleCategory);
// router.patch('/:id', CategoryController.updateCategory);
// router.delete('/:id', CategoryController.deleteCategory);

export const OrderRoutes = router;
