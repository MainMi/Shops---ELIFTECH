const cardShop = require('../database/model/cardShop');

module.exports = {
    getOneCardProduct: (productId) => cardShop.find({ product: productId }).lean(),
    getAllCardProduct: () => cardShop.find().lean()
};
