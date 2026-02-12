const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const otpsend = require('../utils/otpsend');
const addsubcatagorymodel = require('../models/addsubcatagory');
const catagorymodel = require('../models/catagory');
const productmodel = require('../models/product');


const adminpanel = (req, res) => {
    console.log("adminpanel");
    res.render('index');
}

const login = (req, res) => {
    console.log("login");
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login');
    }
}

const loginuser = async (req, res) => {
    res.redirect('/');
}

const register = (req, res) => {
    res.render('register');
}

const registeruser = async (req, res) => {
    try {
        if (req.body.password == req.body.confirmpassword) {
            const hashpassword = await bcrypt.hash(req.body.password, 10);
            let usercopy = new usermodel({ ...req.body, password: hashpassword });
            await usercopy.save();
            res.redirect('/login');
        } else {
            res.redirect('/register');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
}

const profile = async (req, res) => {
    console.log("profile");
    try {
        const user = req.user;
        res.render('profile', { userprofile: user });
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const { name, phone, role, address } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (role) updateData.role = role;
        if (address) updateData.address = address;

        await usermodel.findByIdAndUpdate(userId, updateData);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/profile');
    }
};

const editprofile = async (req, res) => {
    console.log("editprofile");
    try {
        const user = req.user;
        res.render('editprofile', { userprofile: user });
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

const changepassword = async (req, res) => {
    console.log("changepassword");
    try {
        const user = req.user;
        res.render('changepassword', { userprofile: user });
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

const updatepassword = async (req, res) => {

    const user = req.user;
    const isMatch = await bcrypt.compare(req.body.currentpassword, user.password);
    if (!isMatch) {
        return res.redirect('/changepassword');
    }
    if (req.body.newpassword != req.body.confirmpassword) {
        return res.redirect('/changepassword');
    }
    const hashpassword = await bcrypt.hash(req.body.newpassword, 10);
    user.password = hashpassword;
    await user.save();
    res.redirect('/login');
}

const forgetpassword = async (req, res) => {
    console.log("forgetpassword");

    res.render('forgetpassword');
}

const otp = async (req, res) => {
    try {
        console.log("OTP Request Body:", req.body);
        const email = req.body.email;
        console.log("Searching for user with email:", email);

        const user = await usermodel.findOne({ email: email });
        if (!user) {
            console.log("User not found");
            return res.redirect('/forgetpassword');
        }

        const otp = await otpGenerator.generate(4, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        user.otp = otp;
        console.log(otp);

        await user.save();

        otpsend(user.email, otp);
        console.log('Email sent successfully');
        res.render('otppage', { userId: user._id });

    } catch (err) {
        console.log(err);
        res.redirect('/forgetpassword');
    }
}

const otpverify = async (req, res) => {
    try {
        const { otp, userId } = req.body;
        const user = await usermodel.findById(userId);

        if (user.otp === otp) {
            user.otp = null; // Clear OTP after use
            await user.save();
            res.render('forgetpass', { userId: user._id });
        } else {
            console.log("Wrong OTP");
            res.render('otppage', { userId: userId, error: "Invalid OTP" });
        }
    } catch (err) {
        console.log(err);
        res.redirect('/forgetpassword');
    }
}

const forgetpass = async (req, res) => {
    console.log("forgetpass");

    res.render('forgetpass');
}

const verifypassword = async (req, res) => {
    console.log("verifypassword");
    if (req.body.newpassword != req.body.confirmpassword) {
        console.log("Password mismatch");
        return res.render('forgetpass', { userId: req.body.id });
    }
    console.log(req.body);

    const user = await usermodel.findById(req.body.id);

    const hashpassword = await bcrypt.hash(req.body.newpassword, 10);
    user.password = hashpassword;
    console.log(user.password);
    await user.save();
    res.redirect('/login');
}

const addsubcatagory = async (req, res) => {
    console.log("addsubcatagory");
    const catagory = await catagorymodel.find();
    res.render('addsubcatagory', { catagory });
}

const addsubcatagorypost = async (req, res) => {
    console.log("addsubcatagorypost");
    try {
        const subcatagory = new addsubcatagorymodel(req.body);
        await subcatagory.save();
        res.redirect('/addsubcatagory');
    } catch (error) {
        console.log(error);
        const catagory = await catagorymodel.find();
        res.render('addsubcatagory', { catagory });
    }
}

const catagory = async (req, res) => {
    console.log("catagory");
    res.render('catagory');
}

const catagorypost = async (req, res) => {
    console.log("catagorypost");
    try {
        const catagory = new catagorymodel(req.body);
        await catagory.save();
        res.redirect('/catagory');
    } catch (error) {
        console.log(error);
        res.render('catagory');
    }
}

const addproduct = async (req, res) => {
    console.log("addproduct");
    const catagory = await catagorymodel.find();
    const subcatagory = await addsubcatagorymodel.find();
    res.render('addproduct', { catagory, subcatagory });
}

const addproductpost = async (req, res) => {
    console.log("addproductpost");
    try {
        const product = await new productmodel({ ...req.body, sellerId: req.user._id, subcatagoryId: req.body.subcatagory });
        await product.save();
        res.redirect('/addproduct');
    } catch (error) {
        console.log(error);
        const catagory = await catagorymodel.find();
        const subcatagory = await addsubcatagorymodel.find();
        res.render('addproduct', { catagory, subcatagory });
    }
}

const viewproduct = async (req, res) => {
    console.log("viewproduct");
    const products = await productmodel.find({ sellerId: req.user._id }).populate({
        path: 'subcatagoryId',
        populate: {
            path: 'catagoryId',
        }
    });
    console.log(products);
    res.render('viewproduct', { products });
}

const editproduct = async (req, res) => {
    console.log("editproduct");
    const product = await productmodel.findById(req.params.id);
    res.render('editproduct', { product });
}

const editproductpost = async (req, res) => {
    console.log("editproductpost");
    try {
        const product = await productmodel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/viewproduct');
    } catch (error) {
        console.log(error);
        res.redirect('/viewproduct');
    }
}

const deleteproduct = async (req, res) => {
    console.log("deleteproduct");
    try {
        const product = await productmodel.findByIdAndDelete(req.params.id);
        res.redirect('/viewproduct');
    } catch (error) {
        console.log(error);
        res.redirect('/viewproduct');
    }
}


module.exports = { adminpanel, login, register, registeruser, logout, profile, updateProfile, editprofile, changepassword, updatepassword, forgetpassword, otp, otpverify, forgetpass, verifypassword, addsubcatagory, addsubcatagorypost, catagory, catagorypost, addproduct, addproductpost, viewproduct, deleteproduct, editproduct, editproductpost, loginuser };
