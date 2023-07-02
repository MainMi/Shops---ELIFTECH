const { userRoleConstant } = require('../constant');
const { USER_ROLE } = require('../constant/user.role.constant');
const ErrorHandler = require('../error/errorHandler');
const userService = require('../service/user.service');
const { userValidator } = require('../validator');

function permisionRole(currentUserRole, checkRole, objRole) {
    if (objRole) {
        return checkRole.includes(currentUserRole);
    }
    const arrRole = Object.values(userRoleConstant);
    return arrRole.indexOf(currentUserRole) >= arrRole.indexOf(checkRole);
}

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(500, 0, error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserLogin: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findUser({ email });

            if (user) {
                next(new ErrorHandler(403, 0, 'This username or email is already taken'));
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserFind: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findUser({ email });

            if (!user) {
                next(new ErrorHandler(404, 0, 'User not found'));
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (currentRole = USER_ROLE, objRole = false) => (req, res, next) => {
        try {
            const { role } = req.authUser;

            if (!permisionRole(role, currentRole, objRole)) {
                next(new ErrorHandler(403, 0, 'Access denied'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    permisionRole
};
