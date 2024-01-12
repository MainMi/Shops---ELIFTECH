const Shop = require('../database/model/shop');

module.exports = {
    getAllShop: () => Shop.find({}),
    getCurrentShop: (filterData) => Shop.findOne(filterData).lean(),
    addProductToShop: (filterData, id) => Shop.updateOne(filterData, {
        $push: {
            products: id
        }
    }),
    createShop: (shopData) => Shop.create(shopData),
    deleteShop: (queryData) => Shop.deleteOne(queryData),
};
