const cardShop = require('../database/model/cardShop');
const { cardShopService } = require('../service');

module.exports = {
    cardShopPage: async (req, res) => {
        const { getObj } = req.query || {};

        const cardProductRemove = await cardShop.find({ _id: getObj });

        if (cardProductRemove) {
            await cardShop.remove({ _id: getObj });
        }

        const cardProduct = await cardShopService.getAllCardProduct();

        let finallCount = 0;

        cardProduct.forEach((value) => {
            finallCount += value.count * value.product.price;
        });

        res.render('cardShopStatic', { cardProduct, isProduct: !!cardProduct, finallCount });
    }
};
