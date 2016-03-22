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
      console.log(password);
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
};
