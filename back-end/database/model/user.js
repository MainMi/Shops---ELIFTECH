const { Schema, model } = require('mongoose');
const { userRoleConstant } = require('../../constant');

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String },
    language: { type: String, default: 'en' },
    role: { type: String, enum: Object.values(userRoleConstant), default: userRoleConstant.USER_ROLE },
}, { timeseries: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('User', userSchema);
