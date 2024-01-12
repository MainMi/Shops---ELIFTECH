/* eslint-disable max-len */

module.exports = {
    NOT_VALID_PASSWORD: {
        status: 400,
        errorStatus: 4002,
        message: 'Not valid password'
    },
    NOT_VALID_TOKEN: {
        status: 401,
        errorStatus: 4011,
        message: 'Token is invalid'
    },
    NOT_VALID_ACCESS_TOKEN: {
        status: 401,
        errorStatus: 4012,
        message: 'Access token is invalid'
    },
    NOT_VALID_REFRESH_TOKEN: {
        status: 401,
        errorStatus: 4013,
        message: 'Refresh token is invalid'
    },
    NOT_VALID_PARAMS_FN: (name) => ({
        status: 401,
        errorStatus: 4014,
        message: `${name} is invalid`
    }),
    NOT_IS_PROVIDED_TOKEN: {
        status: 401,
        errorStatus: 4015,
        message: 'No token provided'
    },
    ACCESS_DENIED: {
        status: 403,
        errorStatus: 4031,
        message: 'Access denied'
    },
    WRONG_EMAIL_OR_PASSWORD: {
        status: 403,
        errorStatus: 4032,
        message: 'Wrong email or password'
    },
    MAX_LIMIT_SHOPS: {
        status: 403,
        errorStatus: 4033,
        message: 'You have max shops'
    },
    NOT_FOUND_SHOP: {
        status: 404,
        errorStatus: 4041,
        message: 'Shop is not found'
    },
    NOT_FOUND_USER: {
        status: 404,
        errorStatus: 4042,
        message: 'User is not found'
    },
    USER_AUTHORIZED: {
        status: 409,
        errorStatus: 4091,
        message: 'Email is already taken'
    },
};
