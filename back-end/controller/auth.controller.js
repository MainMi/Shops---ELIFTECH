const oauth = require('../database/model/oauth');
const authService = require('../service/auth.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await authService.comparePassword(password, user.password);

            const tokenPair = authService.generateTokenPair({ userId: user._id });

            await oauth.create({ userId: user._id, ...tokenPair });

            req.user = { user, ...tokenPair };

            res.json({
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

            res.json('User is logout');
            next();
        } catch (e) {
            next(e);
        }
    },
};
