const mongoose = require('mongoose');
const encryption = require('../crypto.js');

var userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      require: '{PATH} is required',
      unique: true
    },
    salt: {
      type: String,
      default: ''
    },
    hashPass: {
      type: String,
      default: ''
    }
  },
  github: {
    id: String,
    token: String,
    email: String,
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
