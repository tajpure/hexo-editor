'use strict';
const fs = require('hexo-fs');
const Hexo = require('hexo');

class Editor {

  constructor(base_dir) {
    this.hexo = new Hexo(base_dir, {});
    this.post_dir = base_dir + '/source/_posts';
    this.file = '';
    this.title = '';
    this.date = '';
    this.tags = '';
    this.categories = '';
    this.content = '';
  }

  setTitle(title) {
    title = this.title.replace(/\s+/g, "-");
    file = '/' + this.title + '.md';
    title = 'title: ' + this.title + '';
  }

  getTitle() {
    return this.title;
  }

  setDate(date) {
    date = '\ndate: ' + this.date;
  }

  getDate() {
    return this.date;
  }

  setTags(tags) {
    tags = '\ntags: [' + this.tags + ']';
  }

  getTags() {
    return this.tags;
  }

  setCategories(categories) {
    categories = '\ncategories: ' + this.categories;
  }

  getCategories() {
    return this.categories;
  }

  setContent(content) {
    content = '\n---\n' + this.content;
  }

  getContent() {
    return this.content;
  }

  save() {
    let path = this.post_dir + this.file;
    let source = this.getTitle() + this.getDate() + this.getTags() +
    this.getContent();
    fs.writeFileSync(this.path, source, ['utf8', '438', 'w']);
    console.log('This item ' + this.file + ' was saved!');
  }

  read(title) {

  }
}

module.exports = Editor;
