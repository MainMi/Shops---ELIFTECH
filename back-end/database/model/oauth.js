const { Schema, model } = require('mongoose');

const OAuthSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, required: true, ref: 'User'
    },
    access_token: {
        type: String, unique: true, required: true
    },
    refresh_token: {
        type: String, unique: true, required: true
    },
}, {
    timeseries: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model('OAuth', OAuthSchema);
