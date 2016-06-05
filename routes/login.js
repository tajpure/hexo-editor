'use strict';
const express = require('express');
const router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const auth = require('../models/auth');
const Manager = require('../models/manager');
const Article = require('../models/article');
const util = require('../models/util');
const cache = require('../models/cache');
const emoji = require('../models/emoji');

auth.init(config.username, config.password);
const manager = new Manager(config.base_dir);

router.get('/', (req, res, next) => {
  if (req.session.username || config.local == true) {
    const itemsPromise = manager.getItems();
    itemsPromise.then((files) => {
      let items = new Array();
      for (let i = 0; i < files.length; i++) {
        const article = new Article(manager.post_dir + files[i]);
        items.push(article.getPreview());
        cache.put(article.hashCode(), article.toJson());
      }
      util.sortPosts(items);
      res.render('index', {'items': items});
    }, (err) => {
        console.error(err)
    });
  } else {
    res.render('login', {'emoji': emoji.random()});
  }
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (auth.check(username, password)) {
    req.session.username = username;
  }
  res.redirect('/');
});

module.exports = router;
