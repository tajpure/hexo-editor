'use strict';
const redis = require('redis');
const client = redis.createClient();

const prefix = 'hexo-editor-';

module.exports = {
  put(key, value) {
    client.set(prefix + key, JSON.stringify(value));
  },
  get(key, callback) {
    return client.get(prefix + key, (err, reply) => {
      if (!err) {
        callback(JSON.parse(reply));
      } else {
        console.error(err);
      }
    });
  }
}
