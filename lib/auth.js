/*
* This model used for authentication.
* Author: tajpure
* Since: 2015-11-15
*/

function Auth() {
    this.username = 'hexoeditor';
    this.password = 'hexoeditor';
    var self = this;
    this.init = function(username, password) {
      self.username = username;
      self.password = password;
    };
    this.check = function(username, password) {
      if (username === self.username && password == self.password) {
        console.log(username + " login success.");
        return true;
      } else {
        console.log(username + " login failed.");
        return false;
      }
    }
};

module.exports = new Auth();
