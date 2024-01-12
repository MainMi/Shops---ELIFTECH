const Joi = require('joi');
const { emailREGEXP, passwordREGEXP } = require('../constant/regexp.constant');
const ErrorHandler = require('../error/errorHandler');
const {
    NOT_VALID_PARAMS_FN
} = require('../error/errorUser');

module.exports = Joi.object({
    email: Joi.string().regex(emailREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Email')))
    ),
    password: Joi.string().regex(passwordREGEXP).required().error(
        new ErrorHandler(...Object.values(NOT_VALID_PARAMS_FN('Password')))
    ),
});
