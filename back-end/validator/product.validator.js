const Joi = require('joi');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_DESCRIPTION,
    NOT_VALID_PRICE,
    NOT_VALID_NAME
} = require('../error/errorUser');

module.exports = Joi.object({
    name: Joi.string()
        .min(2)
        .max(200)
        .regex(/^[A-Za-z0-9 ]*$/)
        .required()
        .error(new ErrorHandler(402, 0, NOT_VALID_NAME.en)),
    description: Joi.string()
        .min(1)
        .max(500)
        .required()
        .error(new ErrorHandler(402, 0, NOT_VALID_DESCRIPTION.en)),
    price: Joi.number()
        .min(0.01)
        .max(100000)
        .required()
        .error(new ErrorHandler(402, 0, NOT_VALID_PRICE.en)),
    shop: Joi.string()
});
