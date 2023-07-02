const order = require('../database/model/order');

module.exports = {
    createOrder: (orderData) => order.create(orderData),
    findOrder: (orderData) => order.findOne(orderData)
};
