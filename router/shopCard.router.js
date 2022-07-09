const router = require('express').Router();

const { cardShopController } = require('../controller');

router.get('/', cardShopController.cardShopPage);

module.exports = router;
