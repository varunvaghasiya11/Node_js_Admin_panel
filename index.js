const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./database/db');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(session({
    secret: 'varunvaghasiya',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passportlocal(passport);


app.use('/', routes);
db();
app.listen(3000, (err) => {
    if (!err) {
        console.log("server start");
    }
})
