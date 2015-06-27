var express = require('express');
var router = express.Router();
var admin = require('../model/admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.username;
  if (username == null) {
    res.render('login');
  } else {
    res.render('index');
  }
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
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
  console.log(username);
  req.session.username = null;
  res.redirect('/');
});

module.exports = router;
