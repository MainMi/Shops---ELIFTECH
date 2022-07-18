const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    language: { type: String, default: 'en' },
    userUuid: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'CardShop' }],
}, { timeseries: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('User', userSchema);
