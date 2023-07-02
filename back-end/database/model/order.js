const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    price: { type: Number, require: true },
    product: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});
orderSchema.pre('find', function() {
    this.populate('product');
});
module.exports = model('Order', orderSchema);
