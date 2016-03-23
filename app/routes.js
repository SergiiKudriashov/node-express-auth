//routes
module.exports = function(app, passport) {

    app.get('/', (req, res) => {
        var user = req.user;
        res.render('index.ejs',{user:user});
    });

    app.get('/info', (req, res) => {
        var user = req.user;
        console.log(user);
        res.render('info.ejs',{user:user});
    });

    app.get('/profile', isLoggedIn, (req, res) => {
        var user = req.user;
        console.log(user);
        res.render('profile.ejs', {user:user});
    });

    app.get('/login', (req, res) => {
        var user = req.user;
        res.render('local-login.ejs',{user:user});
    });

    app.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/gitlogin', passport.authenticate('git-login'));

    app.get('/github/callback',
        passport.authenticate('git-login', { failureRedirect: '/' }),
        function(req, res) {
          // Successful authentication, redirect home.
          res.redirect('/profile');
        });

    app.get('/sign', (req, res) => {
        var user = req.user;
        res.render('sign.ejs',{user:user});
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
