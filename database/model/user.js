const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, default: 'en' },
    products: [{ type: Schema.Types.ObjectId, ref: 'CardShop' }],
}, { timeseries: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('User', userSchema);
