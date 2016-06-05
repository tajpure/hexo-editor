'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));

const Manager = require('./manager');

const chunk_size = 64;
const cache_file_name = '.cache';

module.exports = (socket) => {
  const manager = new Manager(config.base_dir);
  let cache = manager.readFromDraft(cache_file_name);
  let dist = '';
  socket.emit('init', cache);

  socket.on('syncText', (article) => {
    const data = article.data;
    let text = '';
    for (let i in data) {
      if (data[i] === null) {
        text += dist.slice((i * chunk_size), (i * chunk_size) + chunk_size);
        continue;
      }
      if (data[i].pos !== null) {
        text += dist.slice(data[i].pos, data[i].pos + chunk_size);
      } else if (data[i].data) {
        text += data[i].data;
      }
    }
    dist = text;
    article.content = dist;
    article.filename = cache_file_name;
    manager.saveToDraft(article);
    socket.emit('syncEnd', 'finished');
  });

  socket.on('publish', (article) => {
    dist = '';
    manager.saveToPost(article);
    article = {'title': 'Untitled', 'date': '', 'tags': '',
                  'categories': '', 'content': ''};
    article.filename = cache_file_name;
    manager.saveToDraft(article);
    socket.emit('publishEnd', 'ok');
  });
};
