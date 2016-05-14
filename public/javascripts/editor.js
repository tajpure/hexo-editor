/*
 * Author: tajpure
 * Since: 2016-05-08
 */

var editor = null;
var socket = io();

var fileInputTextDiv = $('#file_input_text_div');
var fileInput = $('#file_input_file');
var fileInputText = $('#file_input_text');
fileInput.change(changeInputText);
fileInput.change(changeState);

function changeInputText() {
  console.log('dd');
  var str = fileInput.value;
  var i;
  if (str.lastIndexOf('\\')) {
    i = str.lastIndexOf('\\') + 1;
  } else if (str.lastIndexOf('/')) {
    i = str.lastIndexOf('/') + 1;
  }
  fileInputText.value = str.slice(i, str.length);
}

function changeState() {
  console.log('dddd');
  if (fileInputText.value.length != 0) {
    if (!fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.add('is-focused');
    }
  } else {
    if (fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.remove('is-focused');
    }
  }
}

function back() {
  location.href = '/';
}

function closeDialog(dialogId) {
  $('#shadow-mask').css('display', 'none');
  $(dialogId).css('display', 'none');
}

function uploadImage() {
  $('#shadow-mask').css('display', 'block');
  $('#image-upload-dialog').css('display', 'block');
};

function initEditor() {
  editor = ace.edit("editor");
  editor.getSession().setUseWrapMode(true);
  editor.$blockScrolling = Infinity;
  sync();
};

function sync() {
  socket.on('init', function (data) {
    editor.setValue(data, 1);
  });
  editor.on('change', function(e) {
    $('#done').css('display', 'none');
    $('#loading').css('display', 'block');
    var syncData = TextSync.sync(editor.getValue());
    socket.emit('syncText', syncData);
    socket.on('syncEnd', function (data) {
      $('#done').css('display', 'block');
      $('#loading').css('display', 'none');
    });
  });
};

function insertLink () {
  editor.insert('[]()');
};

function formatBlod () {
  var range = editor.selection.getRange();
  var blodText = '**' + editor.getSelectedText() + '**';
  editor.session.replace(range, blodText);
};

function formatItalic () {
  var range = editor.selection.getRange();
  var italicText = '*' + editor.getSelectedText() + '*';
  editor.session.replace(range, italicText);
};

function formatListNumbered () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += i + '. ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

function formatListBulleted () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += '* ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

function formatQuote () {
  var range = editor.selection.getRange();
  var formatText = editor.getSelectedText();
  var rows = formatText.split('\n');
  formatText = '';
  for (var i = 1; i <= rows.length; i++) {
    formatText += '> ' + rows[i-1] + '\n';
  }
  editor.session.replace(range, formatText);
};

function formatCode () {
  var range = editor.selection.getRange();
  var italicText = '```\n' + editor.getSelectedText() + '\n```';
  editor.session.replace(range, italicText);
};

function redo () {
  editor.session.getUndoManager().redo(true);
};

function undo () {
  editor.session.getUndoManager().undo(true);
};

function preview() {
  if ($('#editor').css('display') === 'block') {
    $('#preview').html(marked(editor.getValue()));
    $('#editor').hide();
    $('#preview').show();
    $('#visibility').text('visibility_off');
  } else {
    $('#editor').show();
    $('#preview').hide();
    $('#visibility').text('visibility');
  }
}

function publish() {

}
