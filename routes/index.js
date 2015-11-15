var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
var admin = require('../lib/admin');
var Editor = require('../lib/editor');
var Manager = require('../lib/manager');
var Article = require('../lib/article');
var Util = require('../lib/util');

admin.init(config.username, config.password);
var editor = new Editor(config.base_dir);
var manager = new Manager(config.base_dir);

router.get('/', function(req, res, next) {
  if (req.session.username || config.local == true) {
    var itemsPromise = manager.getItems();
    itemsPromise.then(function(files) {
      var items = new Array();
      for (var i = 0; i < files.length; i++) {
        items.push((new Article(manager.post_dir + files[i])).getPreview());
      }
      Util.sortPosts(items);
      res.render('index', {'items': items});
    }, function (err) {
        console.error(err)
    });
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
  var username = req.session.username;
  console.log(username + ' logout');
  req.session.username = null;
  res.redirect('/');
});

router.get('/newItemPage', function(req, res, next) {
  res.render('editor');
});

router.get('/manageItemsPage', function(req, res, next) {
  var itemsPromise = manager.getItems();
  itemsPromise.then(function(files) {
    var items = new Array();
    for (var i = 0; i < files.length; i++) {
      items.push((new Article(manager.post_dir + files[i])).getPreview());
    }
    Util.sortPosts(items);
    res.render('posts', {'items': items});
  }, function (err) {
      console.error(err)
  });
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
    editor.setTitle(title);
    editor.setDate(date);
    editor.setCategories(categories);
    editor.setTags(tags);
    editor.setContent(content);
    editor.save();
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

// hexo.call('deploy', {}).then(function(){
//   console.log("Deployed successful in path '" + config.base_dir + "'!");
// });

module.exports = router;
