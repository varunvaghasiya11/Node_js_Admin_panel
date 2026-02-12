const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    otp: {
        type: String,
        default: null
    }
});

const usermodel = mongoose.model("usermodel", userSchema);
module.exports = usermodel;
