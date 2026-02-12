const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    image: String,
    sellerId:{
        type: mongoose.Schema.ObjectId,
        ref:"usermodel"
    },
    subcatagoryId:{
        type: mongoose.Schema.ObjectId,
        ref:"subcatagorymodel"
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;