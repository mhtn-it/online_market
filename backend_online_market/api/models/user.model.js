'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    username: {
        type: String,
        required: [true, "can't be blank"]
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    fullName: {
        type: String,
    },
    address: {
        type: String
    },
    phone_number: {
        type: String,
    },
    type: {
        type: String
    },
    token: {
        type: String
    }
});
module.exports = mongoose.model('user', user);