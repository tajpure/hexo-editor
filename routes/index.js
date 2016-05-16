var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
var auth = require('../models/auth');
var Editor = require('../models/editor');
var Manager = require('../models/manager');
var Article = require('../models/article');
var Util = require('../models/util');
var cache = require('../models/cache');
var emoji = require('../models/emoji');
var image = require('../models/image');
var busboy = require('connect-busboy');

auth.init(config.username, config.password);
var editor = new Editor(config.base_dir);
var manager = new Manager(config.base_dir);

router.get('/', function(req, res, next) {
  if (req.session.username || config.local == true) {
    var itemsPromise = manager.getItems();
    itemsPromise.then(function(files) {
      var items = new Array();
      for (var i = 0; i < files.length; i++) {
        var article = new Article(manager.post_dir + files[i]);
        items.push(article.getPreview());
        cache.put(article.hashCode(), article);
      }
      Util.sortPosts(items);
      res.render('index', {'items': items});
    }, function (err) {
        console.error(err)
    });
  } else {
    res.render('login', {'emoji': emoji.random()});
  }
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (auth.check(username, password)) {
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

router.get('/editor', function(req, res, next) {
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

router.post('/post', function(req, res, next) {
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

router.delete('/post', function(req, res, next) {

});

router.put('/post', function(req, res, next) {

});

router.get('/post', function(req, res, next) {
  var articleId = req.query.id;
  var article = cache.get(articleId);
  res.send(article.getPreview().content);
});

router.put('/draft', function(req, res, next) {

});

router.get('/generate', function(req, res, next) {

});

router.get('/deploy', function(req, res, next) {

});

router.post('/image', function(req, res, next) {
  var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        console.log(file);
        fstream = fs.createWriteStream(__dirname + '/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

// hexo.call('deploy', {}).then(function(){
//   console.log("Deployed successful in path '" + config.base_dir + "'!");
// });

module.exports = router;
