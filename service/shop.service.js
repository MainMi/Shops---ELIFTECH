const product = require('../database/model/product');
const Shop = require('../database/model/shop');

module.exports = {
    getAllproductShop: async (name) => {
        const shop = await Shop.findOne({ name });
        return product.find({ shop: shop._id }).lean();
    },
    getShop: () => Shop.find().lean()
};
