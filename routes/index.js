var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");
var admin = require('../model/admin');
var config = require('../config');
var Hexo = require('hexo');
var hexo = new Hexo(config.base_dir, {});

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
    if (err) {
      res.send(err);
    }
    var title = fields.title[0];
    var date = fields.date[0];
    var categories = fields.categories[0];
    var tags = fields.tags[0];
    var content = fields.content[0];
    hexo.call('new', { _ : [title]}).then(function(){
      
    });
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

hexo.init().then(function(){
  console.log("Initialized successful in path '" + config.base_dir + "'");
});

// hexo.call('deploy', {}).then(function(){
//   console.log("Deployed successful in path '" + config.base_dir + "'!");
// });

module.exports = router;
