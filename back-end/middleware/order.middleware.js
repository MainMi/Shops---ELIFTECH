const ErrorHandler = require('../error/errorHandler');
const { orderValidator } = require('../validator');

module.exports = {
    isOrderValid: async (req, res, next) => {
        try {
            const { error } = await orderValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 0, error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
