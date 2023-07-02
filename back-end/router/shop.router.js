const router = require('express').Router();

const productRouter = require('./product.router');
const { shopController } = require('../controller');
const { shopMiddleware } = require('../middleware');

router.use('/product', productRouter);

router.get('/', shopController.getAllShops);
router.post(
    '/create',
    shopMiddleware.isShopValid,
    shopController.createShop
);

module.exports = router;
