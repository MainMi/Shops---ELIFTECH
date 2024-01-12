const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
});

productSchema.pre('find', function() {
    this.populate({
        path: 'shop',
        select: 'name -products',
        model: 'Shop'
    });
});

module.exports = model('Product', productSchema);
