const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  content: String,
  date: {type: Date, default: new Date},
  authorId: String,
  authorAvatar: String,
  authorName: String,
  postId: String
});

module.exports = mongoose.model('Comment', commentSchema);