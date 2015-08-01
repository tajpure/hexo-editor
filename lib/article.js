var fs = require('hexo-fs');

function Article(path) {
  this.content = fs.readFileSync(path, ['utf8', 'r', true]);
  var that = this;
  this.getTitle = function() {
    var regExp = /title: (.*)/i;
    return regExp.exec(that.content)[1];
  };
  this.getTags = function() {
    var regExp = /tags: (.*)/i;
    var tags = regExp.exec(that.content);
    if (tags && tags.length > 0) {
      return tags[1];
    } else {
      return tags;
    }
  };
  this.getCategories = function() {
    var regExp = /categories: (.*)/i;
    var categories = regExp.exec(that.content);
    if (categories && categories.length > 0) {
      return categories[1];
    } else {
      return categories;
    }
  };
  this.getPreviewContent = function() {
    var start = that.content.indexOf('---') + 4;
    if (that.content.length > 50) {
      return that.content.substr(start, 50) + '...';
    } else {
      return that.content;
    };
  };
  this.getContent = function() {
    return that.content;
  };
  this.getImage = function() {
    var regExp = /categories: (.*)/i;
    return regExp.exec(that.content);
  };
  this.getPreview = function() {
    return {
      "title": that.getTitle(),
      "tags": that.getTags(),
      "categories": that.getCategories(),
      "content": that.getPreviewContent(),
      "image": that.getImage()
    };
  }
}

module.exports = Article;
