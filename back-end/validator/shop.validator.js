const Joi = require('joi');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_PARAMS_FN
} = require('../error/errorUser');

module.exports = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Name')))
        ),
    description: Joi.string()
        .min(1)
        .max(500)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Description')))
        ),
});
