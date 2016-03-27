'use strict';
const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  content: {
    text: String
  },
  date: {type: Date, default: new Date},
  authorId: String,
  authorName: String,
  authorAvatar: String,
  comments: [{
    text: String,
    authorId: String,
    authorName: String,
    authorAvatar: String,
  }],
});

// postSchema.methods.createPost = function(data) {
// 	let newUser = new User;
// 	newUser.content.text = data[0];
// }

module.exports = mongoose.model('Post', postSchema);
