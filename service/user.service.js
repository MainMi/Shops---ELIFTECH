const { userModel } = require('../database');

module.exports = {
    createUser: (user) => userModel.create(user)
};
