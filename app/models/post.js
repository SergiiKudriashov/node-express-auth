'use strict';
const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  content: {
    text: String
  },
  data: {type: Date, default: new Date},
  authorId: String,
  authorAvatar: String,
  authorName: String,
  comments: {type: Array, default: []},
});

// postSchema.methods.createPost = function(data) {
// 	let newUser = new User;
// 	newUser.content.text = data[0];
// }

module.exports = mongoose.model('Post', postSchema);
