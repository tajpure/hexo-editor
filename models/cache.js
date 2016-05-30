'use strict';
let hashmap = new Array();

module.exports = {
  put(key, value) {
    hashmap[key] = value;
  },
  get(key) {
    return hashmap[key];
  }
}
