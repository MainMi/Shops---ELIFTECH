const { Schema, model } = require('mongoose');

const shopSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = model('Shop', shopSchema);
