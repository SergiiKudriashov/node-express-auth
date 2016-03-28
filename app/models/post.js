'use strict';
const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  content: {
    text: String
  },
  date: {type: Date, default: Date.now()},
  authorId: String,
  authorName: String,
  authorAvatar: String,
  comments: [{
      text: String,
      authorId: String,
      authorAvatar: String,
      authorName: String,
      date: Date
  }],
});

postSchema.statics.findAndModify = (query, options) => {
    return  mongoose
        .model('Post')
        .findOneAndUpdate(query, options, { new: true })
        .populate('author')
        .populate('comments.author')
};

module.exports = mongoose.model('Post', postSchema);
