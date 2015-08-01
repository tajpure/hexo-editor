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
  var that = this;
  this.setTitle = function(title) {
    title = title.replace(/\s+/g, "-");
    that.file = '/' + title + '.md';
    that.title = 'title: "' + title + '"';
  };
  this.getTitle = function() {
    return that.title;
  };
  this.setDate = function(date) {
    that.date = '\ndate: ' + date;
  };
  this.getDate = function() {
    return that.date;
  };
  this.setTags = function(tags) {
    that.tags = '\ntags: [' + tags + ']';
  };
  this.getTags = function() {
    return that.tags;
  };
  this.setCategories = function(categories) {
    that.categories = '\ncategories: ' + categories;
  };
  this.getCategories = function() {
    return that.categories;
  };
  this.setContent = function(content) {
    that.content = '\n---\n' + content;
  };
  this.getContent = function() {
    return that.content;
  };
  this.save = function() {
    var path = that.post_dir + that.file;
    var source = that.getTitle() + that.getDate() + that.getTags() +
          that.getContent();
    fs.writeFileSync(path, source, ['utf8', '438', 'w']);
    console.log('This item ' + that.file + 'was saved!');
  };
  this.read = function(title) {

  }
}

module.exports = Editor;
