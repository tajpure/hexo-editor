'use strict';
const express = require('express');
const router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const Manager = require('../models/manager');
const Article = require('../models/article');
const cache = require('../models/cache');
const util = require('../models/util');
const manager = new Manager(config.base_dir);

router.get('/posts', (req, res, next) => {
  const itemsPromise = manager.getItems();
  itemsPromise.then((files) => {
    let items = new Array();
    for (let i = 0; i < files.length; i++) {
      const article = new Article(manager.post_dir + files[i]);
      items.push(article.toJson());
      cache.put(article.hashCode(), article.toJson());
    }
    util.sortPosts(items);
    res.render('posts', {'items': items});
  }, (err) => {
      console.error(err);
  });
});

router.get('/drafts', (req, res, next) => {
  const itemsPromise = manager.getDraftItems();
  itemsPromise.then((files) => {
    let items = new Array();
    for (let i = 0; i < files.length; i++) {
      const article = new Article(manager.post_dir + files[i]);
      items.push(article.toJson());
      cache.put(article.hashCode(), article.toJson());
    }
    util.sortPosts(items);
    res.render('drafts', {'items': items});
  }, (err) => {
      console.error(err);
  });
});

router.get('/trash', (req, res, next) => {
  const itemsPromise = manager.getTrashItems();
  itemsPromise.then((files) => {
    let items = new Array();
    for (let i = 0; i < files.length; i++) {
      const article = new Article(manager.post_dir + files[i]);
      items.push(article.toJson());
      cache.put(article.hashCode(), article.toJson());
    }
    util.sortPosts(items);
    res.render('trash', {'items': items});
  }, (err) => {
      console.error(err);
  });
});

module.exports = router;
