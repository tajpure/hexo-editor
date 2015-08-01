var fs = require('hexo-fs');

function Article(path) {
  this.content = readFileSync(path, ['utf8', 'r', true]);
  var that = this;
  this.getTitle = function() {

  };
  this.getTags = function() {

  };
  this.getCategories = function() {

  };
  this.getPreviewContent = function() {

  };
  this.getContent = function() {

  };
  this.getImage = function() {

  };
  this.getPreview = function() {
    return {
      "title": that.getTitle(),
      "tags": that.getTags(),
      "categories": that.getCategories(),
      "content": that.getPreviewContent(),
      "image": getImage()
    };
  }
}

module.exports = Article;
