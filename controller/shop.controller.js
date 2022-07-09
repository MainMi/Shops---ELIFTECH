const cardShop = require('../database/model/cardShop');
const { shopService, cardShopService } = require('../service');

module.exports = {
    shopPage: async (req, res) => {
        const shops = await shopService.getShop();

        res.render('shopStatic', { shops });
    },

    shopProductPage: async (req, res) => {
        const { shopName } = req.params || {};
        const { getObj } = req.query || {};

        if (getObj) {
            const cardProduct = await cardShopService.getOneCardProduct(getObj);
            if (cardProduct.length) {
                await cardShop.updateOne({ product: getObj }, { $set: { count: +cardProduct[0].count + 1 } });
            } else {
                await cardShop.create({ product: getObj, count: 1 });
            }
        }

        let product = {};

        if (shopName) {
            product = await shopService.getAllproductShop(shopName);
        }

        const shops = await shopService.getShop();

        res.render('shopStatic', { shops, product, isProduct: !!shopName });
    }
};
