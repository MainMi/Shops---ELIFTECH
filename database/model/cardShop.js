const { Schema, model } = require('mongoose');

const cardShopSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: { type: String, default: 1 },
}, { timeseries: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

cardShopSchema.pre('find', function() {
    this.populate('product');
});

cardShopSchema.virtual('full_price').get(function() {
    if (this.product) {
        return +this.count * +this.product.price;
    }
    return this.count;
});

module.exports = model('CardShop', cardShopSchema);
