const Joi = require('joi');
const { emailREGEXP, passwordREGEXP, phoneREGEXP } = require('../constant/regexp.constant');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_PARAMS_FN
} = require('../error/errorUser');

const isRequiredSchema = (schema, required) => (
    required ? schema.required() : schema.optional()
);

module.exports = (required = true) => Joi.object({
    fullname: isRequiredSchema(Joi.string()
        .min(5)
        .max(80)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Fullname')))
        ), required),
    nickname: isRequiredSchema(Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .error(
            new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Nickname')))
        ), required),
    email: isRequiredSchema(Joi.string().regex(emailREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Email')))
    ), required),
    phone: Joi.string().regex(phoneREGEXP).error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Phone')))
    ),
    password: isRequiredSchema(Joi.string().regex(passwordREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Password')))
    ), required),
    address: Joi.string().min(5).max(200).error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Adress')))
    ),
});
