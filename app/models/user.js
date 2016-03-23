const mongoose = require('mongoose');
const encryption = require('../crypto.js');

var userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
    },
    salt: {
      type: String,
    },
    hashPass: {
      type: String,
    }
  },
  github: {
    id: String,
    token: String,
    name: String
  }
});

userSchema.methods.authenticate = function(password) {
  if (encryption.generateHashedPassword(this.local.salt, password) === this.local.hashPass) {
    return true;
  } else {
    return false;
  }
}

module.exports = mongoose.model('User', userSchema);
