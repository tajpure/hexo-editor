var fs = require('hexo-fs');

function Article(path) {
  this.content = fs.readFileSync(path, ['utf8', 'r', true]);
  var self = this;
  this.getTitle = function() {
    var regExp = /title: (.*)/i;
    var title = regExp.exec(self.content)[1];
    return title;
  };
  this.getDate = function() {
    var regExp = /date: (.*)/i;
    var date = regExp.exec(self.content);
    if (date != null && date.length > 0) {
      return date[1];
    } else {
      return date;
    }
  };
  this.getTags = function() {
    var regExp = /tags: (.*)/i;
    var tags = regExp.exec(self.content);
    if (tags && tags.length > 0) {
      return tags[1];
    } else {
      return tags;
    }
  };
  this.getCategories = function() {
    var regExp = /categories: (.*)/i;
    var categories = regExp.exec(self.content);
    if (categories && categories.length > 0) {
      return categories[1];
    } else {
      return categories;
    }
  };
  this.getPreviewContent = function() {
    var start = self.content.indexOf('---') + 4;
    return self.content.substr(start, self.content.length);
  };
  this.getContent = function() {
    var start = self.content.indexOf('---') + 4;
    return self.content.substr(start, self.content.length);
  };
  this.getImage = function() {
    var regExp = /categories: (.*)/i;
    return regExp.exec(self.content);
  };
  this.getPreview = function() {
    return {
      "title": self.getTitle(),
      "date": self.getDate(),
      "tags": self.getTags(),
      "categories": self.getCategories(),
      "content": self.getPreviewContent(),
      "image": self.getImage()
    };
  }
}

module.exports = Article;
