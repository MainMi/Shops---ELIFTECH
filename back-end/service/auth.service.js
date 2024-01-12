// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    JWT_SECRET,
    JWT_SECRET_REFRESH
} = require('../config/config');

const { ACCESS } = '../constant/token.type.constans.js';

const ErrorHandler = require('../error/errorHandler');
const { WRONG_EMAIL_OR_PASSWORD, NOT_VALID_TOKEN } = require('../error/errorUser');
const oauth = require('../database/model/oauth');

module.exports = {
    findByParamsToken: (paramsData) => oauth.findOne(paramsData).populate('userId'),
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {
        const isPasswordEquels = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquels) {
            throw new ErrorHandler(...Object.values(WRONG_EMAIL_OR_PASSWORD));
        }
    },
    generateTokenPair: (encodeData) => {
        const access_token = jwt.sign(encodeData, JWT_SECRET, { expiresIn: '30m' });
        const refresh_token = jwt.sign(encodeData, JWT_SECRET_REFRESH, { expiresIn: '30d' });
        return { access_token, refresh_token };
    },
    createOauth: (userId, tokenPair) => oauth.create({ userId, ...tokenPair }),
    validateToken: (token, tokenType = ACCESS) => {
        const tokenTypeKey = (tokenType === ACCESS)
            ? JWT_SECRET
            : JWT_SECRET_REFRESH;
        try {
            return jwt.verify(token, tokenTypeKey);
        } catch (e) {
            throw new ErrorHandler(...Object.values(NOT_VALID_TOKEN));
        }
    },
};
