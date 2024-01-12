const { authService, userService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hasPassword = await authService.hashPassword(password);

            await userService.createUser({ ...req.body, password: hasPassword });

            res.status(200).send('User register success');

            next();
        } catch (e) {
            next(e);
        }
    },
    userInfo: (req, res, next) => {
        try {
            const { authUser } = req;
            res.status(200).json({ ...authUser, password: undefined });
            next();
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { authUser } = req;
            await userService.updateUser(authUser._id, req.body);
            res.status(200).json('User updated success');
            next();
        } catch (e) {
            next(e);
        }
    }
};
