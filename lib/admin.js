/*
* This model used for admin login.
*/

function Admin() {
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

var admin = new Admin();

module.exports = admin;
