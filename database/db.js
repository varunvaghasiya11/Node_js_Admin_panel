const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect("mongodb://localhost:27017/adminpanel").then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = db;