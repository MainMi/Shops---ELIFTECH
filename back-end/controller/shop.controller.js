const { shopService, userService } = require('../service');
const { deleteProducts } = require('../service/product.service');

module.exports = {
    createShop: async (req, res, next) => {
        try {
            const { _id: userId } = req.authUser;
            const { _id: shopId } = await shopService.createShop(req.body);
            await userService.addUserShop(userId, shopId);
            res.status(200).json('Shop created success');
            next();
        } catch (e) {
            next(e);
        }
    },
    deleteShop: async (req, res, next) => {
        try {
            const { shop } = req.body;
            await deleteProducts({ shop });
            await shopService.deleteShop({ _id: shop });

            res.status(200).json('Shop deleted success');
            next();
        } catch (e) {
            next(e);
        }
    },
    getAllShops: async (req, res, next) => {
        try {
            const shopData = await shopService.getAllShop();

            res.status(200).json(shopData);
            next();
        } catch (e) {
            next(e);
        }
    },
};
