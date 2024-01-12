const Joi = require('joi');
const ErrorHandler = require('../error/errorHandler');
const { NOT_VALID_PARAMS_FN } = require('../error/errorUser');

const isRequiredSchema = (schema, required) => (
    required ? schema.required() : schema.optional()
);

module.exports = (required = true) => Joi.object({
    name: isRequiredSchema(Joi.string()
        .min(2)
        .max(200)
        .regex(/^[A-Za-z0-9 ]*$/)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Name')))
        ), required),
    description: isRequiredSchema(Joi.string()
        .min(1)
        .max(500)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Description')))
        ), required),
    price: isRequiredSchema(Joi.number()
        .min(1)
        .max(100000)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Price')))
        ), required),
    shop: isRequiredSchema(Joi.string(), required)
});
