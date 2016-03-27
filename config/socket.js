'use strict';
const User = require('../app/models/user.js');
const Post = require('../app/models/post.js');

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
      // .populate('authorId')
      // .populate('author')
      // .sort({date:-1})
      Post.find({}).sort({date:-1}).limit(5).populate('author').then(function (posts) {
      // Post.find({}).sort({date:-1}).populate('author').then(function (posts) {
            console.log('__________posts_____________');
            console.log(posts);
            console.log('____________________________');
            io.sockets.emit('init-posts', {posts})
        })
        .catch(function (err) {
          return done(err);
        });

        socket.on('new-post', function (data) {
            console.log('______data________');
            console.log(data);
            console.log('__________________');
            let newPost = new Post;
            newPost.content.text = data[0].value
            newPost.author = data[1].value;
            newPost.authorAvatar = data[2].value;
            newPost.authorName = data[3].value;
            console.log(newPost);
            newPost.save()
                .then((post) => {
                    io.sockets.emit('last-post', {post: post})
                    console.log('_____________post______________');
                    console.log(post);
                      console.log('_____________________________');
                });
            // socket.on('disconnect', function() {
            //  var time = (new Date).toLocaleTimeString();
            //  io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
            // });
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
