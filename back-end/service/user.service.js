const { userModel } = require('../database');

module.exports = {
    createUser: (userData) => userModel.create(userData),
    findUser: (userData) => userModel.findOne(userData)
};
