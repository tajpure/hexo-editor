var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');

var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

var Manager = require('./lib/manager');
var manager = new Manager(config.base_dir);

server.listen(2048);

var CHUNK_SIZE = 64;

io.on('connection', function (socket) {
  var untitled = manager.readFromDraft('untitled');
  var dist = '';
  socket.emit('init', untitled);

  socket.on('syncText', function (data) {
    var text = '';
    for (var i in data) {
      if (data[i] === null) {
        text += dist.slice((i * CHUNK_SIZE), (i * CHUNK_SIZE) + CHUNK_SIZE);
        continue;
      }
      if (data[i].pos !== null) {
        text += dist.slice(data[i].pos, data[i].pos + CHUNK_SIZE);
      } else if (data[i].data) {
        text += data[i].data;
      }
    }
    dist = text;
    manager.saveToDraft('untitled', dist);
    socket.emit('syncEnd', 'finished');
  });
});

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
app.use(express.static(config.base_dir + '/source'));
app.use(session({ username: null, saveUninitialized: true, secret: 'keyboard cat', resave: true, cookie: { maxAge: 60000 }}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// catch session null and forward to login page
app.use(function (req, res, next) {
    if (req.session.username || config.local == true) {
      next();
    } else {
      res.redirect("/");
    }
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

module.exports = app;
