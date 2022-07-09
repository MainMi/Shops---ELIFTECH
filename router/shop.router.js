const router = require('express').Router();

const { shopController } = require('../controller');

router.get('/', shopController.shopPage);
router.get('/:shopName', shopController.shopProductPage);

module.exports = router;
