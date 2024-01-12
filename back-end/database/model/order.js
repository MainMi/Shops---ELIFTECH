const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    price: { type: Number, require: true },
    address: { type: String, require: true },
    product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
orderSchema.pre('find', function() {
    this.populate('product');
});
module.exports = model('Order', orderSchema);
