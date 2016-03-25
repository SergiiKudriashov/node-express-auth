'use strict';
const User = require('../app/models/user.js');
const Post = require('../app/models/post.js');

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        Post.find({}).limit(10).then(function (posts) {
            io.sockets.emit('init-posts', {posts})
        })
        .catch(function (err) {
          return done(err);
        });
        socket.on('new-post', function (data) {
            console.log(data);
            let newPost = new Post;
            newPost.content.text = data[0].value;
            // newPost.authorId = data[1].value;
            // newPost.authorAvatar = data[2].value;
            // newPost.authorName = data[3].value;
            newPost.save()
                .then((post) => {
                    return Post.populate(post, {path: 'authorId'});
                })
                .then((post) => {
                    io.sockets.emit('last-post', {post: post})
                });
            socket.on('disconnect', function() {
             var time = (new Date).toLocaleTimeString();
             io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
            });
        })
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
