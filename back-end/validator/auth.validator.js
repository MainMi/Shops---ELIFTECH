const Joi = require('joi');
const { emailREGEXP, passwordREGEXP } = require('../constant/regexp.constant');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_EMAIL,
    NOT_VALID_PASSWORLD
} = require('../error/errorUser');

module.exports = Joi.object({
    email: Joi.string().regex(emailREGEXP).required().error(new ErrorHandler(402, 0, NOT_VALID_EMAIL.en)),
    password: Joi.string().regex(passwordREGEXP).required().error(new ErrorHandler(402, 0, NOT_VALID_PASSWORLD.en))
});
