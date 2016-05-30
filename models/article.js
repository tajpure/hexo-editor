'use strict';
const fs = require('hexo-fs');
const md5 = require('./md5');

class Article {

  constructor(path) {
    this.content = fs.readFileSync(path, ['utf8', 'r', true]);
  }

  getTitle() {
    const regExp = /title: (.*)/i;
    const title = regExp.exec(this.content)[1];
    return title;
  }

  getDate() {
    const regExp = /date: (.*)/i;
    const date = regExp.exec(this.content);
    if (date != null && date.length > 0) {
      return date[1];
    } else {
      return date;
    }
  }

  getTags() {
    const regExp = /tags: (.*)/i;
    const tags = regExp.exec(this.content);
    if (tags && tags.length > 0) {
      return tags[1];
    } else {
      return tags;
    }
  }

  getCategories() {
    const regExp = /categories: (.*)/i;
    const categories = regExp.exec(this.content);
    if (categories && categories.length > 0) {
      return categories[1];
    } else {
      return categories;
    }
  }

  getPreviewContent() {
    const start = this.content.indexOf('---') + 4;
    return this.content.substr(start, this.content.length);
  }

  getContent() {
    const start = this.content.indexOf('---') + 4;
    return this.content.substr(start, this.content.length);
  }

  getImage() {
    const regExp = /categories: (.*)/i;
    return regExp.exec(this.content);
  }

  getPreview() {
    return {
      "title": this.getTitle(),
      "date": this.getDate(),
      "tags": this.getTags(),
      "categories": this.getCategories(),
      "content": this.getContent(),
      "image": this.getImage(),
      "key": this.hashCode()
    };
  }

  hashCode() {
    return md5(this.content);
  }
}

module.exports = Article;
