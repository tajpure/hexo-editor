'use strict';
const fs = require('hexo-fs');
const Hexo = require('hexo');
const Article = require('./article');
const suffix = '.md';

class Manager {

  constructor(base_dir) {
    this.hexo = new Hexo(base_dir, {});
    this.post_dir = base_dir + '/source/_posts/';
    this.draft_dir = base_dir + '/source/_drafts/';
    this.trash_dir = base_dir + '/source/_trash/';
    this.cache = '';
  }

  generate() {
    this.hexo.call('generate', {}).then(function(){
    });
  }

  deploy() {
    this.hexo.call('deploy', {}).then(function(){
    });
  }

  getItems() {
    return fs.listDir(this.post_dir, []);
  }

  saveToDraft(article) {
    Article.parseJson(article).saveTo(this.draft_dir);
  }

  readFromDraft(title) {
    let path = this.draft_dir + title + suffix;
    return (new Article(path)).toJson();
  }

  saveToPost(article) {
    Article.parseJson(article).saveTo(this.post_dir);
  }

  deletePost(article) {

  }

}

module.exports = Manager;
