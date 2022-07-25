const { Router } = require('express');
const router = Router();

const OrderController = require('../controllers/order.controller');

router.get('/orders/', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOrder);

module.exports = router;