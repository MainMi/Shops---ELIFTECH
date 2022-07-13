const ErrorHandler = require('../error/errorHandler');
const { userValidator } = require('../validator');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 0, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
