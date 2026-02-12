const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

const checklogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}
module.exports = { checkAuth, checklogin };
