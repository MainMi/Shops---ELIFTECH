const { userRoleConstant } = require('../constant');
const { USER_ROLE } = require('../constant/user.role.constant');
const oauth = require('../database/model/oauth');
const ErrorHandler = require('../error/errorHandler');
const {
    USER_AUTHORIZED,
    NOT_FOUND_USER,
    ACCESS_DENIED,
    NOT_IS_PROVIDED_TOKEN,
    NOT_VALID_ACCESS_TOKEN,
    MAX_LIMIT_SHOPS
} = require('../error/errorUser');
const { authService } = require('../service');
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
    isUserValid: (isRequred = true) => async (req, res, next) => {
        try {
            const { error } = await userValidator(isRequred).validate(req.body);
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
                next(new ErrorHandler(...Object.values(USER_AUTHORIZED)));
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
                next(new ErrorHandler(...Object.values(NOT_FOUND_USER)));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRole: (currentRole = USER_ROLE, objRole = false) => (req, res, next) => {
        try {
            const { role } = req.authUser;
            if (!permisionRole(role, currentRole, objRole)) {
                next(new ErrorHandler(...Object.values(ACCESS_DENIED)));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: (isToken = true) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            if (!token || !token.length) {
                if (!isToken) {
                    next();
                    return;
                }
                next(new ErrorHandler(...Object.values(NOT_IS_PROVIDED_TOKEN)));
            }

            authService.validateToken(token);

            const tokenData = await oauth.findOne({ access_token: token }).populate('userId').lean();
            if (!tokenData || !tokenData.userId) {
                next(new ErrorHandler(...Object.values(NOT_VALID_ACCESS_TOKEN)));
                return;
            }
            req.authUser = tokenData.userId;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserShopMax: (req, res, next) => {
        try {
            const user = req.authUser;
            console.log(user.shops.length, user, user.maxShops);
            if (user.shops.length === user.maxShops) {
                next(new ErrorHandler(...Object.values(MAX_LIMIT_SHOPS)));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    isShopInUser: (req, res, next) => {
        try {
            const { authUser, shop } = req;
            const findShop = authUser.shops.find((value) => value._id.toString() === shop._id.toString());
            console.log(findShop);
            if (!findShop.name) {
                next(new ErrorHandler(...Object.values(ACCESS_DENIED)));
                return;
            }
            req.currentShop = findShop;
            next();
        } catch (e) {
            next(e);
        }
    },
    isProductInUser: (req, res, next) => {
        try {
            const { currentShop, productId } = req;
            const findProduct = currentShop.products.find((value) => value._id.toString() === productId.toString());
            if (!findProduct.name) {
                next(new ErrorHandler(...Object.values(ACCESS_DENIED)));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    permisionRole
};
