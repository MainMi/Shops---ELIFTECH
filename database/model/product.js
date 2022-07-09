const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    price: { type: String, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
});

productSchema.pre('find', function() {
    this.populate('shop');
});

module.exports = model('Product', productSchema);
