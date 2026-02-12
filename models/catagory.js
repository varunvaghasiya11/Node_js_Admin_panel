const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    catagory: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: "usermodel"
    }
}, {
    timestamps: true
});

const catagorymodel = mongoose.model("catagorymodel", catagorySchema, "catagories");
module.exports = catagorymodel;
