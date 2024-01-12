const { orderService, userService } = require('../service');

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const { authUser } = req;
            const order = await orderService.createOrder(req.body);
            if (authUser && authUser._id) {
                await userService.addUserOrder(authUser._id, order._id);
            }
            res.status(200).json('Create order success').status(200);
            next();
        } catch (e) {
            next(e);
        }
    }
};
