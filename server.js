'use strict';
const compression = require('compression');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index');
const loginRoute = require('./routes/login');
const pageRoute = require('./routes/page');
const editorRoute = require('./routes/editor')

const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const busboy = require('connect-busboy');
const sync = require('./models/sync');

if (!config.port) {
  config.port = 2048;
}

server.listen(config.port);

io.on('connection', sync);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(busboy());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(config.base_dir + '/source'));
app.use(session({ username: null, saveUninitialized: true, secret: 'hexo editor', resave: true, cookie: { maxAge: 3600000 }}));

app.use('/', loginRoute);

// catch session null and forward to login page
app.use((req, res, next) => {
    if (req.session.username || config.local === true) {
      next();
    } else {
      res.redirect('/');
    }
});

app.use('/editor', editorRoute);
app.use('/page', pageRoute);
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('Hexo Editor is listening at port:' + config.port + '.');

module.exports = app;
