'use strict';
const fs = require('hexo-fs');
const Hexo = require('hexo');

const SUFFIX = '.md';

class Manager {

  constructor(base_dir) {
    this.hexo = new Hexo(base_dir, {});
    this.post_dir = base_dir + '/source/_posts/';
    this.draft_dir = base_dir + '/source/_drafts/';
    this.trash_dir = base_dir + '/source/_trash/';
  }

  generate () {
    this.hexo.call('generate', {}).then(function(){
    });
  }

  deploy () {
    this.hexo.call('deploy', {}).then(function(){
    });
  }

  getItems () {
    return fs.listDir(this.post_dir, []);
  }

  saveToDraft (title, content) {
    let path = this.draft_dir + title + SUFFIX;
    fs.writeFileSync(path, content, ['utf8', '438', 'w']);
  }

  readFromDraft (title) {
    let path = this.draft_dir + title + SUFFIX;
    try {
      return fs.readFileSync(path, ['utf8', 'r', true]);
    } catch (e) {
      return 'title:\ndate:\n';
    }
  }
}

module.exports = Manager;
