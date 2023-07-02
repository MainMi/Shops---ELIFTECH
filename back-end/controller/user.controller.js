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
};
