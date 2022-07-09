const router = require('express').Router();

const { shopRouter, shopCardRouter } = require('.');

router.get('/', (req, res) => res.render('homeStatic'));
router.use('/shops', shopRouter);
router.use('/shopsCard', shopCardRouter);

module.exports = router;
