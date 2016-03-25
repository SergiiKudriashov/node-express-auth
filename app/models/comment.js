const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  content: {
    text: String,
    img: String
  },
  data: {type: Date, default: new Date},
  author: String,
  comments: {type: Array, default: []},
});

module.exports = mongoose.model('Comment', commentSchema);