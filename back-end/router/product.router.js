const router = require('express').Router();

const { productController } = require('../controller');
const { shopMiddleware } = require('../middleware');

router.get('/', productController.getAllProduct);

router.post(
    '/create',
    shopMiddleware.isProductValid,
    shopMiddleware.isFindShop,
    productController.createProduct
);

module.exports = router;
