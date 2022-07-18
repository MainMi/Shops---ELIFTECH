const { v4: uuidv4 } = require('uuid');
const cardShop = require('../database/model/cardShop');
const user = require('../database/model/user');
const { cardShopService } = require('../service');

module.exports = {
    cardShopPage: async (req, res, next) => {
        try {
            const { getObj, typeButton } = req.query || {};

            if (!req.cookies.uuid) {
                res.cookie('uuid', uuidv4());
            }

            const { uuid } = req.cookies;

            const cardProduct = await cardShop.find({ userUuid: uuid, product: getObj }).lean();

            if (cardProduct.length) {
                switch (typeButton) {
                    case 'remove':
                        await cardShop.remove({ userUuid: uuid, product: getObj });
                        break;
                    case 'plusOne':
                        await cardShop.updateOne(
                            { userUuid: uuid, product: getObj },
                            { $set: { count: +cardProduct[0].count + 1 } }
                        );
                        break;
                    case 'minusOne':
                        if ((+cardProduct[0].count - 1) < 1) {
                            await cardShop.remove({ userUuid: uuid, product: getObj });
                            break;
                        }
                        await cardShop.updateOne(
                            { userUuid: uuid, product: getObj },
                            { $set: { count: +cardProduct[0].count - 1 } }
                        );
                        break;
                    default:
                        break;
                }
            }

            const cardProducts = await cardShopService.getAllCardProduct({ userUuid: uuid });

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
        if (!req.cookies.uuid) {
            res.cookie('uuid', uuidv4());
        }

        const { uuid } = req.cookies;

        try {
            const products = await cardShopService.getAllCardProduct({ userUuid: uuid });

            user.create({ ...req.body, products, userUuid: uuid });

            res.redirect('/');

            next();
        } catch (e) {
            next(e);
        }
    }
};
