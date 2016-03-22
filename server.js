'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const config = require('./config/env.js');

app.use(session({
  secret: 'heythisissessionsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(passport.initialize());
// app.use(passport.session());

app.set('view engine', 'ejs');
require('./app/routes.js')(app);

app.listen(config.port, config.ip, function() {
  console.log('Server listening on',  config.ip, config.port);
});

exports = module.exports = app;
