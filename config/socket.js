'use strict';
const User = require('../app/models/user.js');
const Post = require('../app/models/post.js');

module.exports = (server) => {
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', (socket) => {
        socket.on('first-load', (data) => {
            let amountPosts = data.wallConfig.length;
            Post.find({}).sort({date:-1}).limit(amountPosts)
            .then((posts) => {
                io.sockets.emit('init-posts', {posts});
            })
            .catch(function (err) {
                return done(err);
            });
        });

        socket.on('more-posts', function (data) {
            console.log(data);
            // var limit = data.toUpload + data.alreadyUploaded;
            var limit = data.toUpload;
            var skip = data.alreadyUploaded;
            console.log(limit,skip);
            Post.find({}).sort({date:-1}).skip(skip).limit(limit)
            .then((posts) => {
                console.log(posts);
                socket.emit('load-more-posts', {posts: posts});
            })
            .catch(function (err) {
                return done(err);
            });
        })

        socket.on('new-post', function (data) {
            let newPost = new Post;
            newPost.content.text = data[0].value
            newPost.author = data[1].value;
            newPost.authorAvatar = data[2].value;
            newPost.authorName = data[3].value;
            newPost.save()
                .then((post) => {
                    io.sockets.emit('last-post', {post: post})
                })
                .catch(function (err) {
                    return done(err);
                });
        })

        socket.on('new-comment', function (data) {
            console.log(data);
            var newComment = {
                text: data[0].value,
                authorId: data[1].value,
                authorAvatar: data[2].value,
                authorName: data[3].value,
                date: Date.now()
            }
            var post = data[4].value;
            Post.findAndModify({_id: post}, {
                $push: {
                    comments: newComment
                }
            })
            .then(() => {
                io.sockets.emit('last-comment', {comment:newComment,postid:post})
            });
        });

        socket.on('delete-comment', function (data) {
            console.log(data);
            Post.findAndModify({'comments._id': data}, {
                $pull: {
                    comments: {
                        _id: data
                    }
                }
            })
            .then(() => {
                // io.sockets.emit('delete-delete', {post: post})
                io.sockets.emit('delete-comment', {delComment:data})
            });
        });
    });
}
















            // User.findById(data.userId)
            //     .then(function (result) {
            //         socket.broadcast.emit('newUser', {
            //             userId: data.userId,
            //             userName: result.name
            //         });
            //     });
        // });

        // socket.on('selectMark', function (data) {
        //     socket.broadcast.emit('onMarkSelect', data)
        // });
