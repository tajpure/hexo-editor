
var hashmap = new Array();

module.exports = {
  put: function(key, value) {
    hashmap[key] = value;
  },
  get: function(key) {
    return hashmap[key];
  }
}
