var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = app.listen(2048, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Nihility listening at http://%s:%s', host, port);
});

var config = require('./config');
var Hexo = require('hexo');
var hexo = new Hexo(config.base_dir, {});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ username: null, saveUninitialized: true, secret: 'keyboard cat', resave: true, cookie: { maxAge: 60000 }}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

hexo.init().then(function(){
  console.log("Initialized successful in path '" + config.base_dir + "'!");
});

// hexo.call('generate', {}).then(function(){
//   console.log("Generated successful in path '" + config.base_dir + "'!");
// });
//
// hexo.call('deploy', {}).then(function(){
//   console.log("Deployed successful in path '" + config.base_dir + "'!");
// });

module.exports = app;
