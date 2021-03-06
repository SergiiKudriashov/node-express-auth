// passport config
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const encryption = require('../app/crypto.js');

const User = require('../app/models/user.js');
const social = require('./auth.js');

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id)
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
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
            User.findOne({
                'local.username': username
            }, function(err, user) {
                if (err) {
                 return done(err); }
                if (!user) {
                  return done(null, false);
                }
                if (!user.authenticate(password)) {
                  console.error('incorrect password');
                  return done(null, false);
                }
                return done(null, user);
            });
        }));

    passport.use('git-login', new GithubStrategy({
      clientID: social.githubAuth.clientID,
      clientSecret: social.githubAuth.clientSecret,
      callbackURL: social.githubAuth.callbackURL,
      passReqToCallback : true
    },
    function(req, token, refreshToken, profile, done) {
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'github.id' : profile.id }, function(err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.github.token) {
                                user.github.token = token;
                                user.github.name  = profile.username;
                                user.github.avatar  = profile._json.avatar_url;
                                user.save(function(err) {
                                    if (err)
                                        return done(err);
                                    return done(null, user);
                                });
                            }
                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser            = new User();
                            newUser.github.id    = profile.id;
                            newUser.github.token = token;
                            newUser.github.name  = profile.username;
                            newUser.github.avatar  = profile._json.avatar_url;
                            newUser.save(function(err) {
                                if (err)
                                    return done(err);
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session
                    user.github.id    = profile.id;
                    user.github.token = token;
                    user.github.name  = profile.username;
                    user.github.avatar  = profile._json.avatar_url;
                    user.save(function(err) {
                        if (err)
                            return done(err);
                        return done(null, user);
                    });
                }
            });
        }));
};
