const { Schema, model } = require('mongoose');

const shopSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

shopSchema.pre('find', function() {
    this.populate({
        path: 'products',
        model: 'Product'
    });
});

module.exports = model('Shop', shopSchema);
