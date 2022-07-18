const cardShop = require('../database/model/cardShop');

module.exports = {
    getAllCardProduct: (userUuid) => cardShop.find(userUuid).lean()
};
