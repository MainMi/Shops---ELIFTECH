const ErrorHandler = require('../error/errorHandler');
const { shopService } = require('../service');
const { productValidator, shopValidator } = require('../validator');

module.exports = {
    isProductValid: async (req, res, next) => {
        try {
            const { error } = await productValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 1, error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isShopValid: async (req, res, next) => {
        try {
            const { error } = await shopValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 0, error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isFindShop: async (req, res, next) => {
        try {
            const { shop: name } = req.body;

            const shop = await shopService.getCurrentShop({ name });

            if (!shop) {
                throw new ErrorHandler(404, 0, 'Shop is not found');
            }
            req.shop = shop;
            next();
        } catch (e) {
            next(e);
        }
    }
};
