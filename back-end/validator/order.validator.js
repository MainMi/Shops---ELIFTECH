const Joi = require('joi');
const { emailREGEXP, phoneREGEXP } = require('../constant/regexp.constant');
const ErrorHandler = require('../error/errorHandler');
const { NOT_VALID_PARAMS_FN } = require('../error/errorUser');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('FirstName')))
        ),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('LastName')))
        ),
    email: Joi.string().regex(emailREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Home')))
    ),
    phone: Joi.string().regex(phoneREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Phone')))
    ),
    date: Joi.date().required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Date')))
    ),
    price: Joi
        .number()
        .min(0)
        .max(99999)
        .required()
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Price')))
        ),
    product: Joi.array().items(Joi.string()).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Product')))
    ),
    address: Joi.string().min(5).max(200).error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Adress')))
    ),
});
