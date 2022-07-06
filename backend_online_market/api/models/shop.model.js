'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shop = new Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
    },
    address: {
        type: String
    },
    phone_number: {
        type: String,
    },
    describe: {
        type: String,
    },
    certificate: {
        type: String,
        required: [true, "can't be blank"],
    },
});
module.exports = mongoose.model('shop', shop);