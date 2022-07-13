const router = require('express').Router();

const { cardShopController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', cardShopController.cardShopPage);
router.post('/', userMiddleware.isUserValid, cardShopController.cardShopPost);

module.exports = router;
