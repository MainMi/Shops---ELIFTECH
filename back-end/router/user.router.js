const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get(
    '/info',
    userMiddleware.checkAccessToken(),
    userController.userInfo
);
router.post(
    '/update',
    userMiddleware.checkAccessToken(),
    userMiddleware.isUserValid(false),
    userController.updateUser
);

module.exports = router;
