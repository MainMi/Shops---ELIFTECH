const cardShop = require('../database/model/cardShop');
const user = require('../database/model/user');
const { cardShopService } = require('../service');

module.exports = {
    cardShopPage: async (req, res, next) => {
        try {
            const { getObj, typeButton } = req.query || {};

            const cardProduct = await cardShopService.getOneCardProduct(getObj);

            if (cardProduct.length) {
                switch (typeButton) {
                    case 'remove':
                        await cardShop.remove(cardProduct[0]);
                        break;
                    case 'plusOne':
                        await cardShop.updateOne({ product: getObj }, { $set: { count: +cardProduct[0].count + 1 } });
                        break;
                    case 'minusOne':
                        if ((+cardProduct[0].count - 1) < 1) {
                            await cardShop.remove(cardProduct[0]);
                            break;
                        }
                        await cardShop.updateOne({ product: getObj }, { $set: { count: +cardProduct[0].count - 1 } });
                        break;
                    default:
                        break;
                }
            }

            const cardProducts = await cardShopService.getAllCardProduct();

            let finallCount = 0;

            cardProducts.forEach((value) => {
                finallCount += value.count * value.product.price;
            });

            res.render('cardShopStatic', { cardProducts, isProduct: !!cardProducts, finallCount });
        } catch (e) {
            next(e);
        }
    },

    cardShopPost: async (req, res, next) => {
        try {
            const products = await cardShopService.getAllCardProduct();

            user.create({ ...req.body, products });

            res.redirect('/');

            next();
        } catch (e) {
            next(e);
        }
    }
};
