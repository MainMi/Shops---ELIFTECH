const { shopService } = require('../service');

module.exports = {
    createShop: (req, res, next) => {
        try {
            shopService.createShop(req.body);
            res.status(200).json('Product created success');
            next();
        } catch (e) {
            next(e);
        }
    },
    getAllShops: async (req, res, next) => {
        try {
            const productData = await shopService.getAllShop();

            res.json(productData);
            next();
        } catch (e) {
            next(e);
        }
    },
};
