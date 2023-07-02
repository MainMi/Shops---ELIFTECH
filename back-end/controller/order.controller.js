const { orderService } = require('../service');

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            await orderService.createOrder(req.body);
            res.json('Create order success').status(200);
            next();
        } catch (e) {
            next(e);
        }
    }
};
