const router = require('express').Router();

const {
    authRouter,
    shopRouter,
    orderRouter,
    userRouter
} = require('.');

router.use('/auth', authRouter);
router.use('/shop', shopRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);

module.exports = router;
