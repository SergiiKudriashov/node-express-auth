const mongoose = require('mongoose');
const encryption = require('../crypto.js');

var userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      unique: true
    },
    salt: String,
    hashPass: String,
    avatar: String
  },
  github: {
    id: String,
    token: String,
    name: String,
    avatar: String
  }
});

userSchema.methods.authenticate = (password) => {
  if (encryption.generateHashedPassword(this.local.salt, password) === this.local.hashPass) {
    return true;
  } else {
    return false;
  }
}

module.exports = mongoose.model('User', userSchema);
