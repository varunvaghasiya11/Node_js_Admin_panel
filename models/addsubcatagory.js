const mongoose = require('mongoose');

const subcatagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    catagoryId:{
        type: mongoose.Schema.ObjectId,
        ref:"catagorymodel"
    },
},{
    timestamps:true
});

const subcatagorymodel = mongoose.model("subcatagorymodel", subcatagorySchema);
module.exports = subcatagorymodel;
