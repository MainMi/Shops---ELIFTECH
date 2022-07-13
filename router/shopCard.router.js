const router = require('express').Router();

const { cardShopController } = require('../controller');

router.get('/', cardShopController.cardShopPage);
router.post('/', cardShopController.cardShopPost);

module.exports = router;
