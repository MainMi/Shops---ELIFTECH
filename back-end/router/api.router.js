const router = require('express').Router();

const { authRouter, shopRouter, orderRouter } = require('.');

router.use('/auth', authRouter);
router.use('/shop', shopRouter);
router.use('/order', orderRouter);

module.exports = router;
