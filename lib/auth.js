/*
* This model used for authentication.
* Author: tajpure
* Since: 2015-11-15
*/

function Auth() {
    this.username = 'admin';
    this.password = 'admin';
    that = this;
    this.init = function(username, password) {
      that.username = username;
      that.password = password;
    };
    this.check = function(username, password) {
      if (username === that.username && password == that.password) {
        console.log(username + " login success.");
        return true;
      } else {
        console.log(username + " login failed.");
        return false;
      }
    }
};

module.exports = new Auth();
