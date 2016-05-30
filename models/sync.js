'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));

const Manager = require('./manager');

const CHUNK_SIZE = 64;
const CACHE_FILE_NAME = '.cache';

module.exports = (socket) => {
  const manager = new Manager(config.base_dir);
  let cache = manager.readFromDraft(CACHE_FILE_NAME);
  console.log(cache);
  let dist = '';
  socket.emit('init', cache);
  socket.on('syncText', (data) => {
    let text = '';
    for (let i in data) {
      if (data[i] === null) {
        text += dist.slice((i * CHUNK_SIZE), (i * CHUNK_SIZE) + CHUNK_SIZE);
        continue;
      }
      if (data[i].pos !== null) {
        text += dist.slice(data[i].pos, data[i].pos + CHUNK_SIZE);
      } else if (data[i].data) {
        text += data[i].data;
      }
    }
    dist = text;
    manager.saveToDraft(CACHE_FILE_NAME, dist);
    socket.emit('syncEnd', 'finished');
  });
};
