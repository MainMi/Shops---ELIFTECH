const Joi = require('joi');
const { emailREGEXP, passwordREGEXP, phoneREGEXP } = require('../constant/regexp.constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    phone: Joi.string().regex(phoneREGEXP).required(),
    email: Joi.string().regex(emailREGEXP).required(),
    password: Joi.string().regex(passwordREGEXP).required()
});
