'use strict';
const express = require('express');
const router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const Manager = require('../models/manager');
const Editor = require('../models/editor');
const Article = require('../models/article');
const util = require('../models/util');
const cache = require('../models/cache');
const busboy = require('connect-busboy');

const manager = new Manager(config.base_dir);
const editor = new Editor(config.base_dir);

const cache_name = 'cache';

router.get('/logout', (req, res, next) => {
  const username = req.session.username;
  console.log(username + ' logout');
  req.session.username = null;
  res.redirect('/');
});

router.delete('/post', (req, res, next) => {

});

router.put('/post', (req, res, next) => {

});

router.get('/post', (req, res, next) => {
  const articleId = req.query.id;
  cache.get(articleId, (article) => {
    res.send(article.content);
  });
});

router.get('/cache', (req, res, next) => {
  const cachedArticleId = cache_name + req.query.id;
  cache.get(cachedArticleId, (cachedArticle) => {
    if (!cachedArticle) {
      cache.get(req.query.id, (article) => {
        res.send(article);
      })
    } else {
      res.send(cachedArticle);
    }
  });
});

router.put('/draft', (req, res, next) => {

});

router.get('/generate', (req, res, next) => {

});

router.get('/deploy', (req, res, next) => {

});

module.exports = router;
