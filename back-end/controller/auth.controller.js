const oauth = require('../database/model/oauth');
const ErrorHandler = require('../error/errorHandler');
const { NOT_IS_PROVIDED_TOKEN, NOT_VALID_REFRESH_TOKEN } = require('../error/errorUser');
const authService = require('../service/auth.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await authService.comparePassword(password, user.password);
            const tokenPair = authService.generateTokenPair({ userId: user._id });

            authService.createOauth(user._id, tokenPair);

            req.user = { user, ...tokenPair };

            res.status(200).json({
                user,
                ...tokenPair
            });
            next();
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { user } = req;

            await oauth.deleteMany({ userId: user.userId });

            res.status(200).json('User is logout');
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ErrorHandler(...Object.values(NOT_IS_PROVIDED_TOKEN));
            }

            authService.validateToken(token, 'REFRESH');

            const tokenData = await authService.findByParamsToken({ refresh_token: token });

            if (!tokenData || !tokenData.userId) {
                throw new ErrorHandler(...Object.values(NOT_VALID_REFRESH_TOKEN));
            }
            const { id: userId } = tokenData.userId;

            const tokenPair = authService.generateTokenPair({ userId });
            authService.createOauth(userId, tokenPair);

            res.status(200).json({
                tokenPair
            });

            next();
        } catch (e) {
            next(e);
        }
    },
};
