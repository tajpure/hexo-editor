/*
* author:tajpure
*/


function exit() {
  location.href = '/logout';
};

function toast(msg, timeout, handler, actionText) {
  var snackbarContainer = document.querySelector('#snackbar');
  var data = {
    message: msg,
    timeout: timeout,
    actionHandler: handler,
    actionText: actionText
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function edit(key) {
  location.href = '/editor?id=' + key;
};

function stash(key, id) {
  $('#article-' + id).remove();
};

function _delete(key, id) {
  $('#article-' + id).remove();
};
