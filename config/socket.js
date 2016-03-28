'use strict';
const User = require('../app/models/user.js');
const Post = require('../app/models/post.js');
const Comment = require('../app/models/comment.js');

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
        // socket.on('first-load', (data) => {
            // console.log(data);
            // let amountPosts = data.wallConfig.length;
            // let complex = {postIds:[]};
            // Post.find({}).sort({date:-1}).limit(amountPosts)
            // .then(function (data) {
            //     // console.log('posts amount',data.length);
            //     // return res.posts;
            // })
            // .then(() => {
            //     io.sockets.emit('init-posts', {compl});
            // })
        //     .then((posts) => {
        //         // console.log(amountPosts);
        //         complex.posts = posts;
        //         posts.forEach(function(item){
        //             complex.postIds.push({item._id=item._id});
        //             // complex.postIds.item.id
        //         });
        //         return Comments.find({
        //             'postId': complex.postIds
        //         }).sort({date:-1})
        //     })
        //     .then(() => {
        //         // console.log(amountPosts);
        //         // console.log(compl);
        //         io.sockets.emit('init-posts', {compl});
        //     })
        //     .catch(function (err) {
        //       return done(err);
        //     });
        // });



            // .then((post) => {
            //     return Post.populate(post, {path: 'author'});
            // })
            // .then((post) => {
            //     io.sockets.emit('last-post', {post: post})
            // });

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
        socket.on('neeeew-comment', function (data) {
            newComment.postId = data[4].value;
            let newComment = new Comment;
            newComment.content = data[0].value;
            newComment.authorId = data[1].value;
            newComment.authorAvatar = data[2].value;
            newComment.authorName = data[3].value;
            newComment.postId = data[4].value;
            newComment.save()
                .then((comment) => {
                    io.sockets.emit('last-comment', {comment: comment})
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

            // socket.on('disconnect', function() {
            //  var time = (new Date).toLocaleTimeString();
            //  io.sockets.json.send({});
            // });
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
