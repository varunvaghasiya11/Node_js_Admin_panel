const LocalStrategy = require('passport-local').Strategy;
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await usermodel.findOne({ email: email });
            if (!user) {
                console.log("User not found");
                return done(null, false, { message: 'That email is not registered' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                console.log("Password incorrect");
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await usermodel.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
