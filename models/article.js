'use strict';
const fs = require('hexo-fs');
const path = require('path');
const md5 = require('./md5');
const suffix = '.md';

class Article {

  constructor(_path) {
    try {
      this.rawContent = fs.readFileSync(_path, ['utf8', 'r', true]);
      this.filename = path.basename(_path, suffix);
    } catch (e) {
    this.rawContent = this.constructor.getRawContent({'title':'Untitled',
                                          'date': '',
                                          'tags': '',
                                          'categories': '',
                                          'content': ''});
    }
  }

  static getRawContent(article) {
    return 'title: ' + article.title + '\n' +
           'date: ' + article.date + '\n' +
           'tags: [' + article.tags + ']\n' +
           'categories: [' + article.categories + ']\n' +
           '---\n' + article.content;
  }

  static saveTo(dir) {
    let path = null;
    if (this.filename) {
      path = dir + this.filename + suffix;
    } else {
      path = dir + this.title + suffix;
    }
    try {
      fs.writeFileSync(path, this.rawContent, ['utf8', '438', 'w']);
    } catch (e) {
      console.error('save file failed.', e);
    }
  }

  static parse(content) {
    this.rawContent = content;
    return this.toJson();
  }

  static parseJson(article) {
    this.filename = article.filename
    this.title = article.title;
    this.date = article.date;
    this.tags = article.tags;
    this.categories = article.categories;
    this.rawContent = this.getRawContent(article);
    return this;
  }

  getTitle() {
    const regExp = /title: (.*)/i;
    const title = regExp.exec(this.rawContent);
    if (title != null && title.length > 0) {
      return title[1];
    } else {
      return 'Untitled';
    }
  }

  getDate() {
    const regExp = /date: (.*)/i;
    const date = regExp.exec(this.rawContent);
    if (date != null && date.length > 0) {
      return date[1];
    } else {
      return date;
    }
  }

  getTags() {
    const regExp = /tags: (.*)/i;
    const tags = regExp.exec(this.rawContent);
    if (tags && tags.length > 0) {
      return tags[1].replace(/\[([^"]*)\]/g, "$1");
    } else {
      return tags;
    }
  }

  getCategories() {
    const regExp = /categories: (.*)/i;
    const categories = regExp.exec(this.rawContent);
    if (categories && categories.length > 0) {
      return categories[1].replace(/\[([^"]*)\]/g, "$1");
    } else {
      return categories;
    }
  }

  getPreviewContent() {
    const start = this.rawContent.indexOf('---') + 4;
    return this.rawContent.substr(start, this.rawContent.length);
  }

  getContent() {
    const start = this.rawContent.indexOf('---') + 4;
    return this.rawContent.substr(start, this.rawContent.length);
  }

  toJson() {
    return {
      "title": this.getTitle(),
      "date": this.getDate(),
      "tags": this.getTags(),
      "categories": this.getCategories(),
      "content": this.getContent(),
      "key": this.hashCode(),
      "filename": this.filename
    };
  }

  hashCode() {
    return md5(this.rawContent);
  }
}

module.exports = Article;
