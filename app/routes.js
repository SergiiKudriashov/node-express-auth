//routes
// var LocalStrategy    = require('passport-local').Strategy;
// var GithubStrategy = require('passport-github2').Strategy;

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/info', function(req, res) {
        res.render('info.ejs');
    });

};
