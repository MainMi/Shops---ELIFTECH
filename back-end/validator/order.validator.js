const Joi = require('joi');
const { emailREGEXP, phoneREGEXP } = require('../constant/regexp.constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    email: Joi.string().regex(emailREGEXP).required(),
    phone: Joi.string().regex(phoneREGEXP).required(),
    date: Joi.date().required(),
    price: Joi.number().min(0).max(99999).required(),
    product: Joi.array().items(Joi.string()).required()
});
