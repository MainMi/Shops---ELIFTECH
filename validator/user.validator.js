const Joi = require('joi');
const { emailREGEXP, passwordREGEXP, phoneREGEXP } = require('../constant/regexp.constant');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_NAME,
    NOT_VALID_PHONE,
    NOT_VALID_EMAIL,
    NOT_VALID_PASSWORLD
} = require('../error/errorUser');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()
        .error(new ErrorHandler(402, 0, NOT_VALID_NAME.en)),
    email: Joi.string().regex(emailREGEXP).required().error(new ErrorHandler(402, 0, NOT_VALID_EMAIL.en)),
    phone: Joi.string().regex(phoneREGEXP).required().error(new ErrorHandler(402, 0, NOT_VALID_PHONE.en)),
    password: Joi.string().regex(passwordREGEXP).required().error(new ErrorHandler(402, 0, NOT_VALID_PASSWORLD.en))
});
