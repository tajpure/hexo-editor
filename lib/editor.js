var fs = require('hexo-fs');
var Hexo = require('hexo');

function Editor(base_dir) {
  this.hexo = new Hexo(base_dir, {});
  this.post_dir = base_dir + '/source/_posts';
  this.file = '';
  this.title = '';
  this.date = '';
  this.tags = '';
  this.categories = '';
  this.content = '';
  var self = this;
  this.setTitle = function(title) {
    title = title.replace(/\s+/g, "-");
    self.file = '/' + title + '.md';
    self.title = 'title: ' + title + '';
  };
  this.getTitle = function() {
    return self.title;
  };
  this.setDate = function(date) {
    self.date = '\ndate: ' + date;
  };
  this.getDate = function() {
    return self.date;
  };
  this.setTags = function(tags) {
    self.tags = '\ntags: [' + tags + ']';
  };
  this.getTags = function() {
    return self.tags;
  };
  this.setCategories = function(categories) {
    self.categories = '\ncategories: ' + categories;
  };
  this.getCategories = function() {
    return self.categories;
  };
  this.setContent = function(content) {
    self.content = '\n---\n' + content;
  };
  this.getContent = function() {
    return self.content;
  };
  this.save = function() {
    var path = self.post_dir + self.file;
    var source = self.getTitle() + self.getDate() + self.getTags() +
          self.getContent();
    fs.writeFileSync(path, source, ['utf8', '438', 'w']);
    console.log('This item ' + self.file + ' was saved!');
  };
  this.read = function(title) {

  }
}

module.exports = Editor;
