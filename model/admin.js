/*
* This model used for admin login.
*/

function Admin() {
    this.username = 'admin',
    this.password = 'admin',
    this.secret = 'admin',
    that = this,
    this.init = function(username, password, secret) {
      that.username = username;
      that.password = password;
      that.secret = secret;
    },
    this.check = function(username, password, secret) {
      if (username === that.username && password == that.password && secret == that.secret) {
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
