const router = require('express').Router();

const productRouter = require('./product.router');
const { shopController } = require('../controller');
const { shopMiddleware, userMiddleware } = require('../middleware');
const { MANAGER_ROLE } = require('../constant/user.role.constant');

router.get('/', shopController.getAllShops);

router.use('/product', productRouter);
router.post(
    '/create',
    userMiddleware.checkAccessToken(),
    userMiddleware.checkUserRole(MANAGER_ROLE),
    userMiddleware.isUserShopMax,
    shopMiddleware.isShopValid,
    shopController.createShop
);
router.post(
    '/delete',
    userMiddleware.checkAccessToken(),
    userMiddleware.checkUserRole(MANAGER_ROLE),
    shopMiddleware.isFindShop,
    userMiddleware.isShopInUser,
    shopController.deleteShop
);

module.exports = router;
