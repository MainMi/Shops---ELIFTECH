// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    JWT_SECRET,
    JWT_SECRET_REFRESH
} = require('../config/config');

const { ACCESS } = '../constant/token.type.constans.js';

const ErrorHandler = require('../error/errorHandler');
const { BAD_REQUEST } = require('../error/errorStatus');
const { NOT_VALID_TOKEN } = require('../error/errorCustomStatus');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {
        const isPasswordEquels = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquels) {
            throw new ErrorHandler(403, 4031, 'Wrong email or passworld');
        }
    },
    generateTokenPair: (encodeData) => {
        const access_token = jwt.sign(encodeData, JWT_SECRET, { expiresIn: '30m' });
        const refresh_token = jwt.sign(encodeData, JWT_SECRET_REFRESH, { expiresIn: '30d' });
        return { access_token, refresh_token };
    },
    validateToken: (token, tokenType = ACCESS) => {
        const tokenTypeKey = (tokenType === ACCESS)
            ? JWT_SECRET
            : JWT_SECRET_REFRESH;
        try {
            return jwt.verify(token, tokenTypeKey);
        } catch (e) {
            throw new ErrorHandler(BAD_REQUEST, NOT_VALID_TOKEN, 'Invalid token');
        }
    },
};
