const router = require('express').Router();

router.use('/', (req, res) => res.render('homeStatic'));

module.exports = router;
