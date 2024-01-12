const { Schema, model } = require('mongoose');
const { userRoleConstant } = require('../../constant');

const userSchema = new Schema({
    fullname: { type: String, require: true },
    nickname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String },
    role: { type: String, enum: Object.values(userRoleConstant), default: userRoleConstant.USER_ROLE },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    maxShops: { type: Number, default: 5 },
    address: { type: String, default: '' }
}, { timeseries: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.pre(/^find/, function(next) {
    this.populate('orders');
    this.populate('shops');
    next();
});

module.exports = model('User', userSchema);
