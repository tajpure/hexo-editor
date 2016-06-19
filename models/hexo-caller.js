'use strict';
const Hexo = require('hexo');

class Caller {

  constructor(base_dir) {
    this.hexo = new Hexo(base_dir, {});
    this.hexo.init().then(function(){
      console.log('hexo init success.');
    });
  }

  generate(callback) {
    const hexo = this.hexo;
    hexo.call('generate', {}).then(() => {
      callback('generate success.');
      return hexo.exit();
    }).catch((err) => {
      callback('generate failed.');
      return hexo.exit(err);
    });
  }

  deploy(callback) {
    const hexo = this.hexo;
    hexo.call('deploy', {}).then(() => {
      callback('deploy success.');
      return hexo.exit();
    }).catch((err) => {
      callback('deploy failed.');
      return hexo.exit(err);
    });
  }

}

module.exports = Caller;
