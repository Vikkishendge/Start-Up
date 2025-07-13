const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/order_item.controller');

router.post('/', orderItemController.createOrderItem);
router.get('/', orderItemController.getAllOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;
