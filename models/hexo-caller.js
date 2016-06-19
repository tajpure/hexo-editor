'use strict';
const Hexo = require('hexo');

class Caller {

  constructor(base_dir) {
    this.hexo = new Hexo(base_dir, {});
    this.hexo.init().then(function(){
      console.log('Hexo init success.');
    });
  }

  generate(callback) {
    const hexo = this.hexo;
    hexo.call('generate', {}).then(() => {
      callback('Generate success.');
      return hexo.exit();
    }).catch((err) => {
      callback('Generate failed.');
      return hexo.exit(err);
    });
  }

  deploy(callback) {
    const hexo = this.hexo;
    hexo.call('deploy', {}).then(() => {
      callback('Deploy success.');
      return hexo.exit();
    }).catch((err) => {
      callback('Deploy failed.');
      return hexo.exit(err);
    });
  }

}

module.exports = Caller;
