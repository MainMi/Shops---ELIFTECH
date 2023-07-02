const router = require('express').Router();

const orderController = require('../controller/order.controller');
const { orderMiddleware } = require('../middleware');

router.post(
    '/create',
    orderMiddleware.isOrderValid,
    orderController.createOrder
);

module.exports = router;
