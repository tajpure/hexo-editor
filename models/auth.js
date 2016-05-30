/*
* This model used for authentication.
* Author: tajpure
* Since: 2015-11-15
*/
'use strict';
class Auth {

  constructor() {
    this.username = 'hexoeditor';
    this.password = 'hexoeditor';
  }

  init(username, password) {
    this.username = username;
    this.password = password;
  }

  check(username, password) {
    if (username === this.username && password == this.password) {
      console.log(username + " login success.");
      return true;
    } else {
      console.log(username + " login failed.");
      return false;
    }
  }
}

module.exports = new Auth();
