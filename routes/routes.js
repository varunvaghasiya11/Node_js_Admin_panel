const express = require('express');
const routes = express.Router();
const { checkAuth, checklogin } = require('../middleware/auth');
const { adminpanel, login, register, loginuser, registeruser, logout, profile, updateProfile, editprofile, changepassword, updatepassword, forgetpassword, otp, otpverify, forgetpass, verifypassword, addsubcatagory, addsubcatagorypost, catagory, catagorypost, addproduct, addproductpost, viewproduct, deleteproduct, editproduct, editproductpost } = require('../controllers/controller');
const passport = require('passport');
routes.get('/', checkAuth, adminpanel);
routes.get('/login', checklogin, login);
routes.get('/register', register);
routes.get('/logout', logout);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/login' }), loginuser);
routes.post('/registeruser', registeruser);
routes.get('/profile', checkAuth, profile);
routes.get('/editprofile', checkAuth, editprofile);
routes.post('/updateProfile', checkAuth, updateProfile);
routes.get('/changepassword', checkAuth, changepassword);
routes.post('/updatepassword', checkAuth, updatepassword);
routes.get('/forgetpassword', forgetpassword);
routes.post('/otp', otp);
routes.post('/otpverify', otpverify);
routes.get('/forgetpass', forgetpass);
routes.post('/verifypassword', checklogin, verifypassword);
routes.get('/addsubcatagory', checkAuth, addsubcatagory);
routes.post('/addsubcatagory', checkAuth, addsubcatagorypost);

routes.get('/catagory', checkAuth, catagory);
routes.post('/catagorypost', checkAuth, catagorypost);

routes.get('/addproduct', checkAuth, addproduct);
routes.post('/addproductpost', addproductpost);

routes.get('/viewproduct', checkAuth, viewproduct);
routes.get('/editproduct/:id', checkAuth, editproduct);
routes.post('/editproductpost/:id', checkAuth, editproductpost);
routes.get('/deleteproduct/:id', checkAuth, deleteproduct);
module.exports = routes;








