'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport =require('passport');

const app = express();
const config = require('./config/env.js');
const database = require('./config/database.js');

app.use(session({
  secret: 'heythisissessionsecret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
require('./config/mongoose.js')(database);
require('./config/passport.js')(passport);
require('./app/routes.js')(app, passport);

app.listen(config.port, config.ip, function() {
  console.log('Server listening on',  config.ip, config.port);
});

exports = module.exports = app;
