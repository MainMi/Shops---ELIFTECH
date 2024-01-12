const router = require('express').Router();

const { MANAGER_ROLE } = require('../constant/user.role.constant');
const { productController } = require('../controller');
const { shopMiddleware, userMiddleware } = require('../middleware');

router.get('/', productController.getAllProduct);

router.post(
    '/create',
    userMiddleware.checkAccessToken(),
    userMiddleware.checkUserRole(MANAGER_ROLE),
    shopMiddleware.isProductValid(),
    shopMiddleware.isFindShop,
    productController.createProduct
);

router.post(
    '/edit',
    userMiddleware.checkAccessToken(),
    userMiddleware.checkUserRole(MANAGER_ROLE),
    shopMiddleware.isProductValid(false),
    shopMiddleware.isFindShop,
    userMiddleware.isShopInUser,
    productController.editProduct
);

router.post(
    '/delete',
    userMiddleware.checkAccessToken(),
    userMiddleware.checkUserRole(MANAGER_ROLE),
    shopMiddleware.isFindShop,
    userMiddleware.isShopInUser,
    productController.deleteProduct
);

module.exports = router;
