'use strict';
const redis = require('redis');
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

console.log('Connected to redis:' + config.redis_host + ':' + config.redis_port);

const client = redis.createClient(config.redis_port, config.redis_host);

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
