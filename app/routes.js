//routes


module.exports = function(app, passport) {

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });

    app.get('/info', (req, res) => {
        res.render('info.ejs');
    });

    app.get('/profile', (req, res) => {
        res.render('profile.ejs');
    });

    app.get('/login', (req, res) => {
        res.render('local-login.ejs');
    });

    app.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/sign', (req, res) => {
        res.render('sign.ejs');
    });

    app.post('/sign', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/sign'
    }));

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}