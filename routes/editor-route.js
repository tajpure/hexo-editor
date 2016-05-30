'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require("multiparty");
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const Editor = require('../models/editor');
const Manager = require('../models/manager');
const Article = require('../models/article');
const Util = require('../models/util');
const cache = require('../models/cache');
const busboy = require('connect-busboy');

const editor = new Editor(config.base_dir);
const manager = new Manager(config.base_dir);

router.get('/', (req, res, next) => {
  res.render('editor');
});

router.post('/image', (req, res, next) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename) => {
    fstream = fs.createWriteStream(config.base_dir + '/source/' + filename);
    file.pipe(fstream);
    fstream.on('close', () => {
        res.send(filename);
    });
  });
});

module.exports = router;
