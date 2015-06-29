var express = require('express');
var router = express.Router();
var admin = require('../model/admin');
var config = require('../config');
var multiparty = require("multiparty");

admin.init(config.username, config.password);

router.get('/', function(req, res, next) {
  if (req.session.username || config.local == true) {
    res.render('index');
  } else {
    res.render('login');
  }
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (admin.check(username, password)) {
    req.session.username = username;
  }
  res.redirect('/');
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
  res.render('posts');
});

router.post('/newItem', function(req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    console.log(fields);
    res.send('success');
  });
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
