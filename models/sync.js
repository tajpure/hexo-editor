'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));
const cache = require('./cache');
const Manager = require('./manager');

const chunk_size = 64;
const cache_name = 'cache';

module.exports = (socket) => {
  const manager = new Manager(config.base_dir);
  let dist = '';

  cache.get(cache_name, (article) => {
    if (!article) {
      article = {'title': 'Untitled', 'date': '', 'tags': '',
                 'categories': '', 'content': ''};
    }
    socket.emit('init', article);
  });

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
    if (article.key) {
      cache.put(cache_name + article.key, article);
    } else {
      cache.put(cache_name, article);
    }
    socket.emit('syncEnd', 'finished');
  });

  socket.on('publish', (article) => {
    dist = '';
    manager.saveToPost(article);
    article = {'title': 'Untitled', 'date': '', 'tags': '',
                  'categories': '', 'content': ''};
    cache.put(cache_name, article);
    socket.emit('publishEnd', 'ok');
  });
};
