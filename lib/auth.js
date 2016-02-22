/*
* This model used for authentication.
* Author: tajpure
* Since: 201	-11-15
*/

function Auth() {
    this.username = 'hexoeditor';
    this.password = 'hexoeditor';
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
