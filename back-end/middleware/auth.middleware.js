const ErrorHandler = require('../error/errorHandler');
const { authValidator } = require('../validator');

module.exports = {
    isLoginValid: async (req, res, next) => {
        try {
            const { error } = await authValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 0, error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
