var express = require('express');
var router = express.Router();
var admin = require('../model/admin');
var config = require('../config');

admin.init(config.username, config.password);

router.get('/', function(req, res, next) {
  var username = req.session.username;
  if (username != null || config.local == true) {
    res.render('index');
  } else {
    res.render('login');
  }
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var secret = req.body.secret;
  console.log(username + password + secret);
  if (admin.check(username, password)) {
    req.session.username = username;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

router.get('/logout', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username + ' logout');
  req.session.username = null;
  res.redirect('/');
});

router.get('/newItemPage', function(req, res, next) {
  res.render('editor');
});

router.get('/manageItemsPage', function(req, res, next) {
  res.render('manage');
});

router.get('/newItem', function(req, res, next) {

});

router.get('/deleteItem', function(req, res, next) {

});

router.get('/updateItem', function(req, res, next) {

});

router.get('/getItem', function(req, res, next) {

});

router.get('/generate', function(req, res, next) {

});

router.get('/deploy', function(req, res, next) {

});

module.exports = router;
