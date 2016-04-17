var fs = require('hexo-fs');
var Hexo = require('hexo');

var SUFFIX = '.md';

function Manager(base_dir) {
  this.hexo = new Hexo(base_dir, {});
  this.post_dir = base_dir + '/source/_posts/';
  this.draft_dir = base_dir + '/source/_drafts/';
  this.trash_dir = base_dir + '/source/_trash/';
  var self = this;
  this.generate = function () {

  };
  this.deploy = function () {

  };
  this.getItems = function () {
    return fs.listDir(self.post_dir, []);
  };
  this.saveToDraft = function (title, content) {
    var path = self.draft_dir + title + SUFFIX;
    fs.writeFileSync(path, content, ['utf8', '438', 'w']);
  };
  this.readFromDraft = function (title) {
    var path = self.draft_dir + title + SUFFIX;
    try {
      return fs.readFileSync(path, ['utf8', 'r', true]);
    } catch (e) {
      return '';
    }
  }
}

module.exports = Manager;
