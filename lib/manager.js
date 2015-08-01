var fs = require('hexo-fs');
var Hexo = require('hexo');

function Manager(base_dir) {
  this.hexo = new Hexo(base_dir, {});
  this.post_dir = base_dir + '/source/_posts';
  var that = this;
  console.log('ddd' + fs.listDir(that.post_dir, [], []));
  this.generate = function() {

  };
  this.deploy = function() {

  };
  this.getItems = function() {
    console.log(fs.listDir(that.post_dir, [], []));
  }
}

module.exports = Manager;
