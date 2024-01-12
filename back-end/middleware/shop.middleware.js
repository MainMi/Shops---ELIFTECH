const ErrorHandler = require('../error/errorHandler');
const { NOT_FOUND_SHOP } = require('../error/errorUser');
const { shopService } = require('../service');
const { productValidator, shopValidator } = require('../validator');

module.exports = {
    isProductValid: (isRequired = true) => async (req, res, next) => {
        try {
            const { error } = await productValidator(isRequired).validate({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                shop: req.body.shop
            });
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
            const { shop: _id } = req.body;

            const shop = await shopService.getCurrentShop({ _id });

            if (!shop) {
                throw new ErrorHandler(...Object.values(NOT_FOUND_SHOP));
            }
            req.shop = shop;
            next();
        } catch (e) {
            next(e);
        }
    },
    
};
