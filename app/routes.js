//routes
'use strict';
const multer = require('multer');
const mime = require('mime');
const User = require('./models/user.js');

module.exports = function(app, passport) {

    app.get('/', (req, res) => {
        var user = req.user;
        res.render('index.ejs', {
            user: user
        });
    });

    app.get('/info', (req, res) => {
        var user = req.user;
        // console.log(user);
        res.render('info.ejs', {
            user: user
        });
    });

    app.get('/profile', isLoggedIn, (req, res) => {
        var user = req.user;
        console.log(user);
        res.render('profile.ejs', {
            user: user
        });
    });

    app.get('/login', (req, res) => {
        var user = req.user;
        res.render('local-login.ejs', {
            user: user
        });
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
        passport.authenticate('git-login', {
            failureRedirect: '/'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/profile');
        });

    app.get('/sign', (req, res) => {
        var user = req.user;
        res.render('sign.ejs', {
            user: user
        });
    });

    app.post('/sign', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/sign'
    }));

    app.post('/avatar', upload.single('avatar'), function(req, res, done) {
        var filename = (req.file.filename);
        var username = (req.user.local.username);
        // console.log(filename,username);
            User.findOne({
                'local.username': username
            }, function(err, user) {
                if (err) {
                return done(err); }
                console.log(user);
                user.local.avatar = '/static/uploads/' + filename;
                user.save(function(err) {
                    if (err) {
                        return done(err);
                    }
                    console.log(user);
                    return done(null, user);
                });
            });
        res.redirect('/profile');
    })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
const uploadPlace = './public/uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPlace)
  },
  filename: function (req, file, cb) {
    if (req.user&&req.user.local.username) {
        cb(null, req.user.local.username+'.'+mime.extension(file.mimetype));
    } else {
        cb('Log in mfk');
    }
  }
})


const upload = multer({ storage: storage })