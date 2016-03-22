const mongoose = require('mongoose');
const UserModel = require('../app/models/user.js');
const database = require('./database.js');

module.exports = function(database) {
    mongoose.connect(database.url);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    UserModel.init();
};
