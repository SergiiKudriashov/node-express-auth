// passport config
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const encryption = require('../app/crypto.js');

const User = require('../app/models/user.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log(req.body.username, req.body.password, req.body.confirm);
            var username = req.body.username,
                password = req.body.password,
                confirm = req.body.confirm;
            if (!username) {
                console.log('invalid user');
                return done(null, false, {
                    message: 'invalid user'
                })
            }
            if (password !== confirm) {
                console.log('password do not match');
                return done(null, false, {
                    message: 'password do not match'
                })
            }
            var newUser = new User();
            newUser.local.username = username;
            newUser.local.salt = encryption.generateSalt();
            newUser.local.hashPass = encryption.generateHashedPassword(newUser.local.salt, password);
            newUser.save(function(err) {
                if (err)
                    return done(err);
                return done(null, newUser);
            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            console.log(username, password);
            User.findOne({
                'local.username': username
            }, function(err, user) {
              console.log(user);
                if (err) {
                  console.error('error');
                 return done(err); }
                if (!user) {
                  console.error('no such user');
                  return done(null, false);
                }
                if (!user.authenticate(password)) {
                  console.error('incorrect password');
                  return done(null, false);
                }
                return done(null, user);
            });
        }));
};