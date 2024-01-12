const router = require('express').Router();

const { userController, authController } = require('../controller');
const { authMiddleware } = require('../middleware');
const userMiddleware = require('../middleware/user.middleware');

router.post(
    '/register',
    userMiddleware.isUserValid(),
    userMiddleware.isUserLogin,
    userController.createUser
);

router.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddleware.isUserFind,
    authController.login
);
router.get(
    '/refresh',
    authController.checkRefreshToken
);
router.get(
    '/access',
    userMiddleware.checkAccessToken()
);

module.exports = router;