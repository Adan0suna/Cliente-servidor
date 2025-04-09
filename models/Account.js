const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    owner: {
        type: String,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Account', accountSchema); 