'use strict';

let cache = []

module.exports = {
  put(key, value) {
    cache[key] = value
  },
  get(key, callback) {
    return callback(cache[key])
  }
}
