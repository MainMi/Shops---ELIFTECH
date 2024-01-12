const router = require('express').Router();

const orderController = require('../controller/order.controller');
const { orderMiddleware, authMiddleware, userMiddleware } = require('../middleware');

router.post(
    '/create',
    orderMiddleware.isOrderValid,
    userMiddleware.checkAccessToken(false),
    orderController.createOrder
);

module.exports = router;
