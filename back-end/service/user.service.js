const { userModel } = require('../database');

module.exports = {
    createUser: (userData) => userModel.create(userData),
    findUser: (userData) => userModel.findOne(userData),
    updateUser: (userId, newData) => userModel.findByIdAndUpdate(userId, { $set: newData }),
    addUserOrder: (userId, newOrderId) => userModel.findByIdAndUpdate(userId, {
        $push: { orders: newOrderId }
    }),
    addUserShop: (userId, newShopId) => userModel.findByIdAndUpdate(userId, {
        $push: { shops: newShopId }
    }),
};
